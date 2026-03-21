variable "hcloud_token" {
  description = "Hetzner Cloud API token"
  type        = string
  sensitive   = true
}

variable "domain" {
  description = "Domain name for the site"
  type        = string
  default     = "carlgranitoy.com"
}

variable "ci_public_key" {
  description = "SSH public key for the CI deploy user"
  type        = string
}
