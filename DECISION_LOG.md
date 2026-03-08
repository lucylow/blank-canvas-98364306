# Decision Log — SafeStep Navigator

## D1: Frontend Framework (2026-03-01)
**Options**: React + Vite, Next.js, Vue 3  
**Decision**: React 18 + Vite + TypeScript  
**Rationale**: Fast HMR, broad ecosystem, strong TypeScript support, Lovable platform compatibility  
**Tradeoff**: No SSR — acceptable for SPA dashboard/demo use case

## D2: AR Navigation Approach (2026-03-02)
**Options**: WebXR API, native ARKit/ARCore, simulated AR view  
**Decision**: Simulated AR view with safety-coded waypoint markers  
**Rationale**: WebXR browser support is inconsistent; simulated view guarantees demo reliability for judges  
**Tradeoff**: Not true camera-overlay AR — documented as "AR simulation" in UI  
**Next**: `docs/REAL_AR.md` would outline WebXR migration path

## D3: Goose AI Integration (2026-03-03)
**Options**: Real Goose CLI calls, simulated JSON responses  
**Decision**: Simulated (MVP) with realistic analysis animation  
**Rationale**: Backend reliability for judges > live API complexity; mock ensures consistent demo  
**Next**: Production path uses Goose CLI with `goose analyze --safety` prompt

## D4: Blockchain Layer (2026-03-03)
**Options**: Real Polygon testnet transactions, fully mocked  
**Decision**: Mock blockchain client with realistic TX hashes  
**Rationale**: Eliminates gas/RPC failures during judging; NFT mint flow is visually identical  
**Tradeoff**: No on-chain verification — mock TXs clearly labeled

## D5: Map Rendering (2026-03-04)
**Options**: Leaflet with real tiles, Mapbox GL, custom SVG map  
**Decision**: Custom SVG-based map preview with safety overlays  
**Rationale**: No API key dependency, works offline, full control over safety heat visualization  
**Tradeoff**: Not a real street map — clearly labeled as "Interactive map preview"

## D6: Safety Score Algorithm (2026-03-04)
**Options**: ML model, weighted heuristic, static scores  
**Decision**: Weighted heuristic combining lighting (40%), activity (25%), incidents (25%), community (10%)  
**Rationale**: Transparent, explainable to judges via GooseExplainDrawer; weights based on UN Women research  
**Tradeoff**: Not a trained ML model — documented as "heuristic informed by research"

## D7: NFT Standard (2026-03-05)
**Options**: ERC-721, ERC-1155, Soulbound (ERC-5192)  
**Decision**: Soulbound NFT (non-transferable)  
**Rationale**: Safety journey tokens should not be tradeable — reflects genuine personal achievement  
**Tradeoff**: Cannot be sold/traded — this is intentional for integrity

## D8: Dark Theme Only (2026-03-05)
**Options**: Light + dark toggle, dark only, system preference  
**Decision**: Dark theme only  
**Rationale**: App is designed for nighttime use; dark UI reduces screen glare while walking at night  
**Tradeoff**: No light mode — aligns with the night-safety use case
