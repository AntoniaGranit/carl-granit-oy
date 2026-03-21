output "server_ip" {
  description = "Public IPv4 address of the server"
  value       = hcloud_server.web.ipv4_address
}

output "server_ipv6" {
  description = "Public IPv6 address of the server"
  value       = hcloud_server.web.ipv6_address
}

output "server_status" {
  description = "Server status"
  value       = hcloud_server.web.status
}

output "ssh_command" {
  description = "SSH into the server as devops"
  value       = "ssh devops@${hcloud_server.web.ipv4_address}"
}

output "ssl_setup_command" {
  description = "Run this on the server after pointing DNS to the IP"
  value       = "scp setup-ssl.sh devops@${hcloud_server.web.ipv4_address}:~ && ssh devops@${hcloud_server.web.ipv4_address} 'sudo bash setup-ssl.sh ${var.domain} <your-email>'"
}
