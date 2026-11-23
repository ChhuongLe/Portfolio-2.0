export type Project = {
  title: string;
  description: string;
  tags?: string[];
  href?: string;
  featured?: boolean;
  problem?: string;
  task?: string;
  approach?: string[];
  outcome?: string;
  diagram?: string;
};

export const projects: Project[] = [
  {
    title: "SSF Building Network Build-Out",
    description:
      "Led the end-to-end network build for Neuralink's new multi-floor South San Francisco site in three weeks, from racking and switch adoption through a dual-ISP cutover, with the whole site network managed as Terraform code.",
    tags: ["FortiGate HA", "FortiSwitch / MCLAG", "Terraform", "802.1X / RADIUS", "IPsec / BGP", "Dual-WAN", "IPv6", "VLANs"],
    featured: true,
    problem:
      "A new multi-floor building needed a production network from empty racks: corporate staff, labs, CI hardware-in-the-loop racks, security cameras and conference rooms all had to come online in three weeks, ahead of the company's move-in.",
    task:
      "Design and build the site network end to end, connect it to AWS and the other sites, cut over to new ISPs safely, and bring every firewall and switch under version-controlled code.",
    approach: [
      "Designed a new /16 address plan segmented into corp, guest Wi-Fi, IoT, management, security and AV VLANs, with quarantine-by-default edge ports so a jack must be explicitly assigned before it joins corp.",
      "Deployed the perimeter firewall as an active-passive FortiGate 200F HA pair (FGCP) with session sync, so established connections survive a failover and the site stays up through a firewall failure or upgrade, alongside a 36-switch FortiSwitch fabric: MCLAG core pair, top-of-rack per floor, 20+ edge switches, AP-tier PoE, and cascaded lab switches for the CI runner racks, with floor uplinks moved from 10G to 100G.",
      "Ran a staged dual-ISP cutover (10G primary, 1G failover) with IPv6 dual-stack, distance-based failover and link monitors split into transport and public-path checks, so no traffic moved until the planned on-site switchover.",
      "Built site-to-AWS IPsec tunnels with ECMP over the primary ISP and backups over the failover ISP, plus BGP, coordinating the AWS customer-gateway change to land in the same window.",
      "Rolled out 802.1X / EAP-TLS wireless against central RADIUS and brought the security stack online: VMS and blade servers, cameras on the security VLAN, and guard workstations.",
      "Managed the firewalls, switch controller, VLANs, DHCP and security policies in Terraform with MR review and Vault-backed credentials, importing hand-built objects without touching live traffic and ending a recurring '7 to add / 1 to destroy' drift by matching resource keys to the firewall's naming.",
    ],
    outcome:
      "Delivered in three weeks: the site runs on a segmented, redundant network with two ISPs, failover paths to AWS and certificate-based Wi-Fi, and no single firewall is a point of failure, and every firewall and switch change now goes through code review with clean Terraform plans instead of recurring drift.",
    diagram: `  ISP A 10G (primary)    ISP B 1G (failover)
            |                     |
            v                     v
+--------------------------------------------+
|  FortiGate 200F HA pair - dual-stack v4/v6 |
+--------------------------------------------+
     |                          |
     |  IPsec (ECMP) + BGP      |
     v                          v
   AWS                +--------------------+
                      | MCLAG core pair    |
                      +--------------------+
                         |  100G uplinks
                         v
+--------------------------------------------+
|  ToR + edge switches per floor (36 total)  |
|  AP PoE tier   |   lab HIL runner racks    |
+--------------------------------------------+
  VLANs: corp | guest | IoT | mgmt | sec | AV
  Wi-Fi: 802.1X EAP-TLS > RADIUS
  Config: Terraform (FortiOS) + MR review`,
  },
  {
    title: "Hybrid-Cloud Infrastructure & Network Architecture",
    description:
      "Designed and implemented a high-performance hybrid-cloud pipeline bridging an OCI VPS (public edge) to a private Proxmox VE environment, providing secure, abstracted access to on-premise application services.",
    tags: ["OCI", "WireGuard", "nftables", "tcpdump", "LXC"],
    featured: true,
    problem:
      "Wanted to expose home-lab services (Jellyfin, Minecraft, Killing Floor 2) to the public internet without putting the home network's WAN IP directly in the firing line. Routing everything through a cheap OCI VPS over WireGuard was the plan — getting there meant tracing a chain of silent failures across the cloud firewall, the Linux NAT stack, and asymmetric routing.",
    approach: [
      "Engineered a secure backhaul utilizing WireGuard for low-overhead, kernel-level traffic encryption, ensuring line-speed performance for latency-sensitive applications.",
      "Diagnostic Mastery: conducted deep packet inspection via tcpdump to resolve complex asymmetric routing issues, reconciling kernel-level netfilter conflicts between iptables and nftables.",
      "Traffic Optimization: streamlined ingress/egress by deploying stateful SNAT/DNAT (masquerade) rules and refining WireGuard interface routing, effectively eliminating packet drops and SYN-timeout latency.",
      "Environment Standardization: optimized data consistency and resource utilization by orchestrating unprivileged LXC containers and Docker namespaces with unified storage mount paths to ensure deterministic application behavior.",
    ],
    outcome:
      "Public traffic now reaches every home-lab service through a single encrypted tunnel with nothing exposed on the home network directly, and the whole chain — cloud firewall, NAT, routing — resolves symmetrically instead of silently dropping packets.",
    diagram: `Public Internet
        |
        v
+------------------------+
|     OCI VPS (ens3)     |  < NSG ingress opened to 0.0.0.0/0
+------------------------+
        |  DNAT > wg0
        v
+------------------------+
| WireGuard tunnel (wg0) |  < SNAT egress, AllowedIPs 0.0.0.0/0
+------------------------+
        |
        v
+----------------------------------------------+
|         Proxmox host - 10.10.10.0/24         |
|                                              |
|         +----------+   +----------+          |
|         | Jellyfin |   |Minecraft |          |
|         +----------+   +----------+          |
|                                              |
|         +----------+   +----------+          |
|         |   KF2    |   |  Admin   |          |
|         +----------+   +----------+          |
+----------------------------------------------+`,
  },
  {
    title: "Self-Hosted Platform: SSO, Edge Hardening & a Custom Chat App",
    description:
      "Secured a home-lab of media, photo and chat services behind one passkey login and a Cloudflare-only edge, and brought a custom chat-app fork up to date.",
    tags: ["OIDC / Pocket ID", "Proxmox VE", "Cloudflare", "Caddy", "iptables", "Tailscale", "LiveKit", "SolidJS"],
    featured: true,
    problem:
      "Every service had its own internet-facing login, the origin accepted traffic from anyone, and one DHCP lease change took every public site offline.",
    task:
      "Restore service, then lock the stack down end to end and bring the chat platform's custom fork up to date without losing its features.",
    approach: [
      "Traced the outage to the reverse proxy losing its DHCP lease, then gave every service IP a router reservation.",
      "Rolled out passkey SSO (Pocket ID / OIDC) across Jellyfin, Immich, the chat app and Proxmox, with a TOTP-protected break-glass root account.",
      "Restricted the origin to Cloudflare with an iptables chain on Docker's DOCKER-USER path, hardened Caddy with real-client-IP handling and security headers, and moved admin access to a Tailscale subnet router.",
      "Upgraded Jellyfin 10.11 to 12.4 and moved the chat backend to MongoDB 8 + Valkey, taking snapshots first.",
      "Ported the custom SolidJS chat client from v0.10 to v0.16 (SSO, branding, 1440p60 screen share, HD audio, background blur) and fixed an iPhone camera dropout by making blur fail-safe.",
    ],
    outcome:
      "One passkey login across every service, an origin reachable only through Cloudflare, and a chat app back on the latest upstream with all its custom features, with a rollback path behind every change.",
    diagram: `Internet
        |
        v
+------------------------+
|    Cloudflare proxy    |  < TLS + WAF at the edge
+------------------------+
        |  80/443
        v
+------------------------+
| iptables CF-ONLY chain |  < drops non-Cloudflare SYNs
+------------------------+
        |
        v
+------------------------+
|  Caddy reverse proxy   |  < real client IP + headers
+------------------------+
        |
        v
+----------------------------------------------+
|          Proxmox VE - LXC + Docker           |
|                                              |
|   +----------+   +----------+   +---------+  |
|   | Jellyfin |   |  Immich  |   | WokChat |  |
|   +----------+   +----------+   +---------+  |
|         |              |             |       |
|         +--------------+-------------+       |
|                        |                     |
|               +----------------+             |
|               | Pocket ID OIDC |  passkeys   |
|               +----------------+             |
+----------------------------------------------+
        ^
        |  admin access: Tailscale subnet router only
   Phone / laptop`,
  },
  {
    title: "Zero-Touch Kiosk Fleet Provisioning",
    description:
      "Replaced manual imaging for Weee!'s packing-station kiosk fleet with a PXE + Ansible pipeline spanning a segmented VLAN network, turning every station into an identical, stateless, monitored node.",
    tags: ["PXE", "Ansible", "VLAN Segmentation", "Zabbix"],
    featured: true,
    problem:
      "Packing station kiosks were imaged by hand, one at a time. Configuration drift across the fleet and an unsupported OS version contributed to a data breach, and just keeping the stations consistent was eating 20+ hours a week.",
    approach: [
      "Segmented the network into 5 VLANs (IT services, office admin, packing lines, IoT) and routed PXE traffic across the boundary with an OpenWRT DHCP relay, so packing-line kiosks can netboot from the core Meraki network without being on it.",
      "Chained the PXE handshake (discover → relay → DHCP offer with options 66/67 → bootloader fetch) straight into an unattended Ubuntu install, then handed off to Ansible for apps, printer configs, and kiosk lockdown — the OS stays disposable, all persistent state lives in automation.",
      "Staggered Ansible deployments in batches of 5 with Wake-on-LAN plus wait_for checks against the OpenSSH banner, since the secondary router's single-core CPU couldn't survive the whole fleet netbooting at once.",
      "Designed around failure instead of hoping it wouldn't happen: a cold-standby HDD clone for the PXE server, and a redundant DHCP relay pair sharing a VIP with heartbeat monitoring so one relay going down doesn't stall provisioning.",
      "Tracked down a quieter blocker no one expects — Raspberry Pi units with no BIOS/F12 menu were defaulting to SD card boot — and fixed it by rewriting the EEPROM boot-order config to prioritize netboot.",
      "Wired every kiosk, the DHCP relay, and the PXE drive bay into Zabbix (deployed as an Ansible task) for state monitoring, alerting to Slack with dashboards in Grafana.",
    ],
    outcome:
      "A 50-station fleet across 4 packing-line switches now provisions in about 8 minutes a station with zero manual imaging, and every node lands in the same known-good, monitored state — no more chasing configuration drift.",
    diagram: `Packing station (VLAN 20)
        |  DHCP discover
        v
+------------------------+
|   OpenWRT DHCP relay   |  < bridges VLAN 20 > core net
+------------------------+
        |
        v
+------------------------+
|   PXE / DHCP server    |  < options 66/67: bootloader + path
+------------------------+
        |
        v
+------------------------+
|   TFTP > unattended    |
|     Ubuntu install     |
+------------------------+
        |
        v
+------------------------+
| Ansible (batches of 5) |  < apps, printers, kiosk lockdown
+------------------------+
        |
        v
+------------------------+
|      Zabbix agent      |  < state > Slack + Grafana
+------------------------+
        |
        v
   Kiosk ready (~8 min/station)`,
  },
];
