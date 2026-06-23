$ErrorActionPreference = "Stop"

# Create directories
$dirs = @(
    ".github/workflows",
    "apps/web/app", "apps/web/components", "apps/web/features", "apps/web/store", "apps/web/hooks", "apps/web/lib", "apps/web/assets", "apps/web/types",
    "apps/mobile/src",
    "apps/api-core/src/common", "apps/api-core/src/config", "apps/api-core/src/core", 
    "apps/api-core/src/modules/users", "apps/api-core/src/modules/gamification", "apps/api-core/src/modules/finance", "apps/api-core/src/modules/tasks", "apps/api-core/src/modules/ai-tutor",
    "apps/api-realtime/cmd/server", "apps/api-realtime/internal/chat", "apps/api-realtime/internal/sync", "apps/api-realtime/internal/cache", "apps/api-realtime/pkg",
    "packages/ui", "packages/config-eslint", "packages/config-typescript",
    "docker"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# Create files
$files = @(
    "apps/api-core/src/main.ts",
    "apps/api-realtime/cmd/server/main.go",
    "apps/api-realtime/go.mod",
    "apps/api-realtime/go.sum",
    "docker/docker-compose.yml",
    "docker/Dockerfile.web",
    "docker/Dockerfile.api-core",
    "docker/Dockerfile.api-realtime"
)

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

# Initialize Bun
try {
    bun init -y
} catch {
    Write-Host "Bun might not be installed or failed to initialize. Continuing..."
}

# Write package.json
$packageJson = @"
{
  `"name`": `"supernova-learning-platform`",
  `"version`": `"1.0.0`",
  `"private`": true,
  `"workspaces`": [
    `"apps/*`",
    `"packages/*`"
  ],
  `"scripts`": {
    `"dev:web`": `"bun --cwd apps/web run dev`",
    `"dev:api-core`": `"bun --cwd apps/api-core run start:dev`",
    `"dev:api-realtime`": `"cd apps/api-realtime && go run cmd/server/main.go`"
  },
  `"dependencies`": {},
  `"devDependencies`": {}
}
"@

Set-Content -Path "package.json" -Value $packageJson

Write-Host "Scaffolding complete!"
