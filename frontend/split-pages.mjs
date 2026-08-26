/**
 * Splits src/features/<feature>/screens.tsx into one file per page.
 * Mechanical, verbatim code movement via the TypeScript AST.
 * Fails loudly instead of guessing.
 */
import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

const ROOT = "D:/Centing Raja/frontend"
const DRY_RUN = process.argv.includes("--dry")

const kebab = (s) =>
  s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").toLowerCase()

const FEATURES = [
  {
    feature: "onboarding",
    pages: {
      LoadingScreen: { file: "Loading", name: "Loading" },
      WelcomeScreen: { file: "Welcome", name: "Welcome" },
      AboutScreen: { file: "TentangCentingRaja", name: "TentangCentingRaja" },
      ParentGuideScreen: { file: "Panduan", name: "Panduan" },
    },
    helpers: [
      // exported today, but only used internally -> become local helpers
      { name: "CentingRajaLogo", into: "LoadingScreen" },
      { name: "Pagination", into: "WelcomeScreen" },
    ],
  },
  {
    feature: "auth",
    pages: {
      AuthScreen: { file: "CentingRajaAuth", name: "CentingRajaAuth" },
      LoginScreen: { file: "MasukCentingRaja", name: "MasukCentingRaja" },
      RegisterScreen: { file: "DaftarCentingRaja", name: "DaftarCentingRaja" },
      OtpScreen: { file: "VerifikasiOtp", name: "VerifikasiOtp" },
      SuccessScreen: { file: "DaftarBerhasil", name: "DaftarBerhasil" },
    },
  },
  {
    feature: "kader",
    pages: {
      KaderDashboard: { file: "BerandaKader", name: "BerandaKader" },
      DataBerhasilDisimpanScreen: {
        file: "DataBerhasilDisimpan",
        name: "DataBerhasilDisimpan",
      },
      EditProfileScreen: { file: "EditProfileKader", name: "EditProfileKader" },
      UbahKataSandiScreen: {
        file: "UbahKataSandiKader",
        name: "UbahKataSandiKader",
      },
      PusatBantuanScreen: { file: "PusatBantuanKader", name: "PusatBantuanKader" },
      KebijakanPrivasiScreen: {
        file: "KebijakanPrivasiKader",
        name: "KebijakanPrivasiKader",
      },
      ProfileKaderScreen: { file: "ProfileKader", name: "ProfileKader" },
      InputPengukuranScreen: {
        file: "InputDataPengukuran",
        name: "InputDataPengukuran",
      },
      DataPengukuranScreen: { file: "DataPengukuran", name: "DataPengukuran" },
      TugasBulanIniScreen: { file: "TugasBulanIni", name: "TugasBulanIni" },
      MateriKaderScreen: { file: "MateriKader", name: "MateriKader" },
      KuisKaderScreen: { file: "KuisKader", name: "KuisKader" },
      QuizResultScreen: { file: "ResultKader", name: "ResultKader" },
    },
  },
  {
    feature: "parent",
    pages: {
      ParentDashboardScreen: { file: "BerandaOrangTua", name: "BerandaOrangTua" },
      InputDataAnakScreen: { file: "InputDataAnak", name: "InputDataAnak" },
      ParentSuccessScreen: {
        file: "DataAnakBerhasilDisimpan",
        name: "DataAnakBerhasilDisimpan",
      },
      ParentMeasurementInputScreen: {
        file: "InputPengukuranOrangTua",
        name: "InputPengukuranOrangTua",
      },
      ParentGrowthDetailScreen: {
        file: "DetailPertumbuhan",
        name: "DetailPertumbuhan",
      },
      ParentMaterialsScreen: { file: "MateriEdukasi", name: "MateriEdukasi" },
      ParentMaterialDetailScreen: {
        file: "DetailMateriEdukasi",
        name: "DetailMateriEdukasi",
      },
    },
    dataModule: {
      file: "parentMaterials",
      names: ["parentMaterialItems", "ParentMaterial"],
    },
  },
]

const errors = []
function fail(msg) {
  errors.push(msg)
}

/** Collect every Identifier text in a source snippet (over-approximation is OK). */
function collectIdentifiers(text, context) {
  const sf = ts.createSourceFile("snippet.tsx", text, ts.ScriptTarget.Latest, true)
  const ids = new Set()
  const visit = (node) => {
    if (ts.isIdentifier(node)) ids.add(node.text)
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return ids
}

function declaredNames(stmt) {
  const names = []
  if (ts.isVariableStatement(stmt)) {
    for (const d of stmt.declarationList.declarations) {
      if (ts.isIdentifier(d.name)) names.push(d.name.text)
    }
  } else if (
    ts.isFunctionDeclaration(stmt) ||
    ts.isTypeAliasDeclaration(stmt) ||
    ts.isClassDeclaration(stmt) ||
    ts.isInterfaceDeclaration(stmt)
  ) {
    if (stmt.name) names.push(stmt.name.text)
  }
  return names
}

function hasExportModifier(stmt) {
  return stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
}

function stripExport(text) {
  return text.replace(/^export\s+/, "")
}

function renameFnDef(text, oldName, newName) {
  const needle = `function ${oldName}(`
  if (!text.includes(needle)) fail(`Cannot find definition needle "${needle}"`)
  return text.replace(needle, `function ${newName}(`)
}

function importBindingNames(stmt) {
  const names = []
  const cl = stmt.importClause
  if (!cl) return names
  if (cl.name) names.push(cl.name.text)
  if (cl.namedBindings && ts.isNamedImports(cl.namedBindings)) {
    for (const el of cl.namedBindings.elements) names.push(el.name.text)
  }
  return names
}

function splitFeature(cfg) {
  const rel = `src/features/${cfg.feature}/screens.tsx`
  const abs = path.join(ROOT, rel)
  const text = fs.readFileSync(abs, "utf8")
  const sf = ts.createSourceFile(abs, text, ts.ScriptTarget.Latest, true)

  let reactImportText = null
  const imports = [] // {stmt, names, module}
  const screens = [] // {oldName, node}
  const helpers = [] // {name, into, node}
  const floats = [] // {names, node}
  const dataStmts = [] // for dataModule
  const dataNames = new Set(cfg.dataModule?.names ?? [])

  for (const stmt of sf.statements) {
    if (ts.isImportDeclaration(stmt)) {
      const mod = stmt.moduleSpecifier.text
      if (mod === "react") {
        reactImportText = stmt.getFullText(sf).trim()
        continue
      }
      imports.push({
        stmt,
        names: importBindingNames(stmt),
        module: mod,
        text: stmt.getFullText(sf).trim(),
      })
      continue
    }
    const names = declaredNames(stmt)
    if (ts.isFunctionDeclaration(stmt) && hasExportModifier(stmt) && stmt.name) {
      const n = stmt.name.text
      if (cfg.helpers?.some((h) => h.name === n)) {
        const h = cfg.helpers.find((x) => x.name === n)
        helpers.push({ ...h, node: stmt })
      } else if (cfg.pages[n]) {
        screens.push({ oldName: n, cfg: cfg.pages[n], node: stmt })
      } else {
        fail(`${rel}: unexpected exported function "${n}" (not in pages/helpers)`)
      }
      continue
    }
    if (names.some((n) => dataNames.has(n))) {
      dataStmts.push(stmt)
      continue
    }
    if (hasExportModifier(stmt)) {
      fail(
        `${rel}: unhandled exported statement "${names.join(",")}" — extend script`,
      )
      continue
    }
    if (names.length === 0) {
      fail(`${rel}: statement at line ${sf.getLineAndCharacterOfPosition(stmt.getStart()).line + 1} declares nothing recognizable`)
      continue
    }
    floats.push({ names, node: stmt })
  }

  // ---- per-screen identifier sets (screen body + merged helpers) ----
  const pageIds = new Map()
  for (const s of screens) {
    const body = s.node.getText(sf)
    const mergedHelpers = helpers.filter((h) => h.into === s.oldName)
    const full = mergedHelpers.map((h) => h.node.getText(sf)).join("\n\n") + "\n\n" + body
    pageIds.set(s.oldName, {
      ids: collectIdentifiers(full, `${rel}:${s.oldName}`),
      mergedHelpers,
    })
  }

  function computeFloatPlan() {
    return floats.map((f) => {
      const consumers = [...pageIds.entries()]
        .filter(([, v]) => f.names.some((n) => v.ids.has(n)))
        .map(([k]) => k)
      return { ...f, consumers }
    })
  }

  // ---- transitively pull identifiers of assigned floats into page id sets ----
  // (a float like privacySections may itself reference imported paths/consts)
  let floatPlan = computeFloatPlan()
  for (let round = 0; round < floats.length + 1; round++) {
    let grew = false
    for (const s of screens) {
      const entry = pageIds.get(s.oldName)
      for (const f of floatPlan.filter((x) => x.consumers.includes(s.oldName))) {
        const fids = collectIdentifiers(
          stripExport(f.node.getText(sf)),
          `${rel}:${s.oldName}:float:${f.names.join(",")}`,
        )
        for (const id of fids) {
          if (!entry.ids.has(id)) {
            entry.ids.add(id)
            grew = true
          }
        }
      }
    }
    floatPlan = computeFloatPlan()
    if (!grew) break
  }

  const pageMap = cfg.pages
  const allPageOldNames = new Set(Object.keys(pageMap))
  const knownTopLevel = new Set([
    ...allPageOldNames,
    ...helpers.map((h) => h.name),
    ...floats.flatMap((f) => f.names),
    ...dataNames,
    ...imports.flatMap((i) => i.names),
  ])

  // ---- build each page file ----
  const outputs = [] // {relPath, content}
  const resolvedFor = new Map() // oldPage -> Set(names provided)

  for (const s of screens) {
    const { ids, mergedHelpers } = pageIds.get(s.oldName)
    const provided = new Set()

    // imports used by this page
    const usedImports = imports.filter((i) =>
      i.names.some((n) => ids.has(n)),
    )
    for (const i of usedImports) provided.add(i.names)

    // floats consumed by this page (duplicate verbatim when shared)
    const usedFloats = floatPlan.filter((f) =>
      f.consumers.includes(s.oldName),
    )

    // data module import
    const usedData = dataStmts
      .flatMap((st) => declaredNames(st))
      .filter((n) => ids.has(n))

    // ---- safety audit: every known name referenced must be provided ----
    for (const id of ids) {
      if (!knownTopLevel.has(id)) continue
      if (id === s.oldName) continue
      if (allPageOldNames.has(id)) {
        fail(
          `${rel}: page ${s.oldName} references sibling page "${id}" — needs manual wiring`,
        )
        continue
      }
      const inImports = usedImports.some((i) => i.names.includes(id))
      const inFloats = usedFloats.some((f) => f.names.includes(id))
      const inHelpers =
        mergedHelpers.some((h) => h.name === id) ||
        mergedHelpers.some((h) =>
          collectIdentifiers(h.node.getText(sf)).has(id),
        )
      const inData = usedData.includes(id)
      const inReact = reactImportText ? reactImportText.includes(id) : false
      if (!inImports && !inFloats && !inHelpers && !inData && !inReact) {
        fail(
          `${rel}: page ${s.oldName} references "${id}" but it is not provided`,
        )
      }
    }

    // ---- assemble file ----
    const compImports = usedImports.filter((i) => i.module.includes("/components/"))
    const dataImports = usedData.length
      ? [
          `import { ${usedData.sort().join(", ")} } from "./${kebab(cfg.dataModule.file)}"`,
        ]
      : []
    const assetImports = usedImports.filter((i) => !i.module.includes("/components/"))

    const groups = [compImports.map((i) => i.text), dataImports, assetImports.map((i) => i.text)]
    const importBlock = groups
      .filter((g) => g.length > 0)
      .map((g) => g.join("\n\n"))
      .join("\n\n")

    const constBlock = usedFloats
      .map((f) => stripExport(f.node.getText(sf)).trim())
      .join("\n\n")

    let fnText = s.node.getText(sf)
    fnText = renameFnDef(fnText, s.oldName, s.cfg.name)

    const helperBlock = mergedHelpers
      .map((h) => stripExport(h.node.getText(sf)).trim())
      .join("\n\n")

    const parts = [reactImportText, importBlock, constBlock, fnText, helperBlock]
    const content = parts.filter((p) => p && p.trim().length > 0).join("\n\n") + "\n"

    outputs.push({
      relPath: `src/features/${cfg.feature}/${kebab(s.cfg.file)}.tsx`,
      content,
      summary: {
        imports: usedImports.map((i) => i.module).concat(dataImports),
        consts: usedFloats.flatMap((f) => f.names),
        helpers: mergedHelpers.map((h) => h.name),
      },
    })
    provided.add(s.oldName)
    resolvedFor.set(s.oldName, provided)
  }

  // ---- data module ----
  if (cfg.dataModule) {
    const dataBody = dataStmts
      .map((st) => st.getText(sf).trim())
      .join("\n\n")
    const dataIds = collectIdentifiers(dataBody, cfg.dataModule.file)
    const neededImports = imports.filter((i) =>
      i.names.some((n) => dataIds.has(n)),
    )
    // audit: every known name referenced by the data module must be provided
    for (const id of dataIds) {
      if (!knownTopLevel.has(id)) continue
      if (dataNames.has(id)) continue
      const ok =
        neededImports.some((i) => i.names.includes(id)) ||
        (reactImportText ? reactImportText.includes(id) : false)
      if (!ok) {
        fail(
          `${rel}: data module "${cfg.dataModule.file}" references "${id}" but it is not provided`,
        )
      }
    }
    const content =
      neededImports.map((i) => i.text).join("\n\n") +
      (neededImports.length ? "\n\n" : "") +
      dataBody +
      "\n"
    outputs.push({
      relPath: `src/features/${cfg.feature}/${kebab(cfg.dataModule.file)}.ts`,
      content,
      summary: { imports: neededImports.map((i) => i.module) },
    })
  }

  // ---- sanity: floats with zero consumers (would be silently dropped) ----
  for (const f of floatPlan) {
    if (f.consumers.length === 0) {
      fail(
        `${rel}: declaration "${f.names.join(",")}" has no consumer page — refusing to drop`,
      )
    }
  }

  return { rel, outputs }
}

const allOutputs = []
for (const cfg of FEATURES) {
  const { rel, outputs } = splitFeature(cfg)
  console.log(`\n== ${rel} ==`)
  for (const o of outputs) {
    console.log(`  -> ${o.relPath}`, JSON.stringify(o.summary))
    allOutputs.push(o)
  }
}

if (errors.length > 0) {
  console.error("\n!!! ABORT — problems detected:")
  for (const e of errors) console.error("  * " + e)
  process.exit(1)
}

if (DRY_RUN) {
  console.log("\nDry run OK — no files written.")
  process.exit(0)
}

for (const o of allOutputs) {
  const abs = path.join(ROOT, o.relPath)
  fs.mkdirSync(path.dirname(abs), { recursive: true })
  fs.writeFileSync(abs, o.content, "utf8")
}
console.log(`\nWrote ${allOutputs.length} files.`)
