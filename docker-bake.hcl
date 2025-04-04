group "default" {
  targets = ["web"]
}

target "web" {
  context    = "."
  dockerfile = "apps/web/Dockerfile"
  platforms  = ["linux/amd64", "linux/arm64"]

  cache-from = ["type=local,src=./.docker-cache"]
  cache-to   = ["type=local,dest=./.docker-cache,mode=max"]
}
