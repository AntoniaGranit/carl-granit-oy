terraform {
  required_version = ">= 1.5"

  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.49"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

data "hcloud_ssh_key" "olle" {
  name = "olle"
}

data "hcloud_ssh_key" "antonia" {
  name = "antonia-gubbe"
}

resource "hcloud_firewall" "web" {
  name = "carl-granit-web"

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "22"
    source_ips = [
      "0.0.0.0/0",
      "::/0",
    ]
  }

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "80"
    source_ips = [
      "0.0.0.0/0",
      "::/0",
    ]
  }

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "443"
    source_ips = [
      "0.0.0.0/0",
      "::/0",
    ]
  }
}

resource "hcloud_server" "web" {
  name        = "carl-granit-oy"
  image       = "ubuntu-24.04"
  server_type = "cx23"
  location    = "hel1"

  ssh_keys = [
    data.hcloud_ssh_key.olle.id,
    data.hcloud_ssh_key.antonia.id,
  ]

  firewall_ids = [hcloud_firewall.web.id]

  user_data = templatefile("${path.module}/cloud-init.yaml.tftpl", {
    domain      = var.domain
    olle_key    = data.hcloud_ssh_key.olle.public_key
    antonia_key = data.hcloud_ssh_key.antonia.public_key
    ci_key      = var.ci_public_key
  })

  labels = {
    project = "carl-granit-oy"
  }
}
