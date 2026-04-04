terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}


# Data source to get the SSH key
data "hcloud_ssh_key" "main" {
  name = var.ssh_key_name
}

# Create a server
resource "hcloud_server" "main" {
  name        = "carl-granit-oy-server"
  image       = "ubuntu-22.04"
  server_type = "cx23"
  location    = "hel1"  # Nuremberg, Germany - you can change this
  ssh_keys    = [data.hcloud_ssh_key.main.id]
  
  # Optional: Add a public network
  public_net {
    ipv4_enabled = true
    ipv6_enabled = true
  }
  
  # Cloud-init user data
  user_data = file("${path.module}/cloud-init.yaml")
}
