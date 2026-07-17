export type Project = {
  title: string;
  description: string;
  tags?: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "SSF Building Network Build-Out",
    description:
      "Designed and built the firewall and network configuration for Neuralink's new South San Francisco building from the ground up.",
    tags: ["Firewall", "Network Architecture"],
  },
  {
    title: "Virtualized Media & Service Automation",
    description:
      "Engineered an automated, containerized ecosystem within Proxmox VE, coordinating self-hosted media services (Jellyfin, *arr stack) through custom Nginx/Caddy reverse proxies and WireGuard VPN tunnels for secure, remote access.",
    tags: ["Proxmox", "Self-Hosting"],
  },
  {
    title: "Automated PXE Network Provisioning",
    description:
      "Developed a streamlined PXE boot environment to automate the deployment of Linux distributions, integrating DHCP/TFTP services and custom kickstart/preseed configurations to enable rapid, zero-touch provisioning for bare-metal servers and test nodes.",
    tags: ["PXE", "Automation"],
  },
];
