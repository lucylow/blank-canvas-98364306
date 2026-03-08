# Risk Log — SafeStep Navigator

| # | Risk | Impact | Status | Mitigation |
|---|------|--------|--------|------------|
| R1 | Backend downtime during demo | High | ✅ Fixed | Mock API fallback (`VITE_USE_MOCK=true`); app works fully offline with mock data |
| R2 | AR GPS drift / camera issues | Medium | ✅ Fixed | Simulated AR view with fixed-offset waypoints; fallback text navigation available |
| R3 | Bias in safety scoring data | High | ✅ Fixed | Weight community reports alongside institutional data; transparent factor display in GooseExplainDrawer |
| R4 | User privacy — GPS tracking | High | ✅ Fixed | No GPS history stored; only anonymized safety summary can be minted as NFT; stated in UI microcopy |
| R5 | Wallet connection failures | Medium | ✅ Fixed | Simulated wallet for demo; graceful fallback shows app without wallet features |
| R6 | Map tile loading failures | Low | ✅ Fixed | Custom SVG map preview — no external tile dependency |
| R7 | Judges unfamiliar with Web3 | Medium | ✅ Fixed | All blockchain features have plain-language explanations; NFT minting is one-click |
| R8 | Alarmist language triggering anxiety | Medium | ✅ Fixed | All microcopy reviewed for supportive, agency-focused tone (e.g., "Goose will help you get back to a safer path") |
