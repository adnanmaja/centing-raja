from pathlib import Path
import re

root = Path(r"D:\Centing Raja\frontend")
features = root / "src" / "features"
components = root / "src" / "components"


def lines(path):
    return path.read_text(encoding="utf-8").splitlines(keepends=True)


def slice_lines(source, start, end):
    return "".join(source[start - 1:end])


def component(path, header, body):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(header + body, encoding="utf-8")

onboarding_path = features / "onboarding" / "screens.tsx"
kader_path = features / "kader" / "screens.tsx"
parent_path = features / "parent" / "screens.tsx"

onboarding = lines(onboarding_path)
kader = lines(kader_path)
parent = lines(parent_path)

component(components / "ui" / "SvgIcon.tsx", 'export function SvgIcon({\n', slice_lines(onboarding, 411, 428).replace('export function SvgIcon({\n', '', 1))
component(components / "ui" / "SectionTitle.tsx", 'import React from "react"\nimport { SvgIcon } from "./SvgIcon"\n\n', slice_lines(onboarding, 430, 453))
component(components / "kader" / "ProfileHeader.tsx", 'import { SvgIcon } from "../ui/SvgIcon"\nimport taskProfilePaths from "../../imports/Icon-3/svg-rygu1218wr"\n\nconst kaderProfileLogo =\n  "/assets/imports/ProfileKader/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"\n\n', slice_lines(kader, 1102, 1147))
component(components / "kader" / "ProfileBottomNav.tsx", 'import { SvgIcon } from "../ui/SvgIcon"\nimport tasksPaths from "../../imports/TugasBulanIni/svg-r0ps2jc1du"\nimport bottomMaterialPaths from "../../imports/Icon-7/svg-kg6sqooalp"\nimport bottomProfilePaths from "../../imports/Icon-6/svg-u0dxovj84o"\n\n', slice_lines(kader, 1149, 1240))
component(components / "parent" / "ParentGrowthChart.tsx", '', slice_lines(parent, 245, 367))
component(components / "parent" / "ParentBottomNav.tsx", 'import { SvgIcon } from "../ui/SvgIcon"\nimport parentDashboardPaths from "../../imports/BerandaBeratBadan/svg-7eotatsl5v"\nimport parentInputPaths from "../../imports/Icon-12/svg-8y72e5yuz3"\n\n', slice_lines(parent, 369, 459))
component(components / "parent" / "ParentNotification.tsx", 'import { SvgIcon } from "../ui/SvgIcon"\nimport parentNotificationPaths from "../../imports/Icon-11/svg-xef1sfe5dj"\n\n', slice_lines(parent, 461, 507))
component(components / "parent" / "ParentInputHeader.tsx", 'import { SvgIcon } from "../ui/SvgIcon"\nimport parentDashboardPaths from "../../imports/BerandaBeratBadan/svg-7eotatsl5v"\n\n', slice_lines(parent, 805, 849))
component(components / "parent" / "ZScoreCard.tsx", 'import React from "react"\n\n', slice_lines(parent, 1372, 1449))

def remove_ranges(source, ranges):
    for start, end in sorted(ranges, reverse=True):
        del source[start - 1:end]
    return source

onboarding_body = remove_ranges(onboarding[:], [(410, 453)])
kader_body = remove_ranges(kader[:], [(1102, 1240)])
parent_body = remove_ranges(parent[:], [(245, 507), (805, 849), (1372, 1449)])

def header_from(original, body, imports):
    header = "".join(original[:244])
    declarations = []
    pattern = re.compile(r'(?ms)^const (\w+) =\n.*?(?=\n(?:const |import |export )|\Z)|^import (\w+) from .*$')
    for match in pattern.finditer(header):
        name = match.group(1) or match.group(2)
        declaration = match.group(0).rstrip() + "\n"
        if len(re.findall(rf'\b{re.escape(name)}\b', "".join(body))) > 0:
            declarations.append(declaration)
    return 'import React, { useEffect, useRef, useState } from "react"\n' + "".join(imports) + "\n" + "\n".join(declarations) + "\n"

onboarding_imports = [
    'import { SectionTitle } from "../../components/ui/SectionTitle"\n',
    'import { SvgIcon } from "../../components/ui/SvgIcon"\n',
]
kader_imports = [
    'import { ProfileBottomNav } from "../../components/kader/ProfileBottomNav"\n',
    'import { ProfileHeader } from "../../components/kader/ProfileHeader"\n',
    'import { SvgIcon } from "../../components/ui/SvgIcon"\n',
]
parent_imports = [
    'import { ParentBottomNav } from "../../components/parent/ParentBottomNav"\n',
    'import { ParentGrowthChart } from "../../components/parent/ParentGrowthChart"\n',
    'import { ParentInputHeader } from "../../components/parent/ParentInputHeader"\n',
    'import { ParentNotification } from "../../components/parent/ParentNotification"\n',
    'import { ZScoreCard } from "../../components/parent/ZScoreCard"\n',
    'import { SvgIcon } from "../../components/ui/SvgIcon"\n',
]

onboarding_path.write_text(header_from(onboarding, onboarding_body[244:], onboarding_imports) + "".join(onboarding_body[244:]), encoding="utf-8")
kader_path.write_text(header_from(kader, kader_body[244:], kader_imports) + "".join(kader_body[244:]), encoding="utf-8")
parent_path.write_text(header_from(parent, parent_body[244:], parent_imports) + "".join(parent_body[244:]), encoding="utf-8")

(root / "src" / "components" / "ui" / "primitives.tsx").unlink()
