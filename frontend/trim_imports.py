from pathlib import Path
import re

root = Path(r"D:\Centing Raja\frontend")

specs = {
    "onboarding": [
        'import { SectionTitle } from "../../components/ui/SectionTitle"',
        'import { SvgIcon } from "../../components/ui/SvgIcon"',
    ],
    "auth": ['import { SvgIcon } from "../../components/ui/SvgIcon"'],
    "kader": [
        'import { ProfileBottomNav } from "../../components/kader/ProfileBottomNav"',
        'import { ProfileHeader } from "../../components/kader/ProfileHeader"',
        'import { SvgIcon } from "../../components/ui/SvgIcon"',
    ],
    "parent": [
        'import { ParentBottomNav } from "../../components/parent/ParentBottomNav"',
        'import { ParentGrowthChart } from "../../components/parent/ParentGrowthChart"',
        'import { ParentInputHeader } from "../../components/parent/ParentInputHeader"',
        'import { ParentNotification } from "../../components/parent/ParentNotification"',
        'import { ZScoreCard } from "../../components/parent/ZScoreCard"',
        'import { SvgIcon } from "../../components/ui/SvgIcon"',
    ],
}

for feature, shared_imports in specs.items():
    path = root / "src" / "features" / feature / "screens.tsx"
    text = path.read_text(encoding="utf-8")
    marker = "export function "
    header, body = text.split(marker, 1)
    body = marker + body
    blocks = [block for block in header.strip().split("\n\n") if not block.startswith("import React")]
    selected = []
    for block in blocks:
        match = re.search(r"^(?:const|import)\s+(\w+)", block)
        if match and re.search(rf"\b{re.escape(match.group(1))}\b", body):
            selected.append(block)
    new_header = '\n'.join(['import React, { useEffect, useRef, useState } from "react"', *shared_imports])
    if selected:
        new_header += "\n\n" + "\n\n".join(selected)
    path.write_text(new_header + "\n\n" + body, encoding="utf-8")
