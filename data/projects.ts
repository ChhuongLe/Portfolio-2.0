export type Project = {
  title: string;
  description: string;
  tags?: string[];
  href?: string;
  featured?: boolean;
  problem?: string;
  approach?: string[];
  outcome?: string;
  diagram?: string;
};

export const projects: Project[] = [
  {
    title: "SSF Building Network Build-Out",
    description:
      "Designed and built the firewall and network configuration for Neuralink's new South San Francisco building from the ground up.",
    tags: ["Firewall", "Network Architecture"],
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
      "Gave a home-lab of media, photo and chat services one passkey login, an origin that only talks to Cloudflare, private remote admin access, and a customized fork of an open-source chat app with video calls.",
    tags: ["OIDC / Pocket ID", "Proxmox VE", "Cloudflare", "Caddy", "iptables", "Tailscale", "LiveKit", "SolidJS", "Docker"],
    featured: true,
    problem:
      "Every service had its own password form facing the internet, the origin answered anyone who found its IP, and one DHCP lease change was enough to knock every public site offline with Cloudflare 521s. On top of that, the self-hosted chat app had to keep up with upstream releases without losing its custom branding, SSO and video features.",
    approach: [
      "Traced the outage to the reverse-proxy container quietly picking up a new DHCP lease, breaking the router's port forward. Fixed it for good with router reservations for every service IP.",
      "Centralized identity on a self-hosted, passkey-based OIDC provider (Pocket ID) and wired it into Jellyfin, Immich, the chat app and the Proxmox VE console. Turned off password login wherever possible and kept a TOTP-protected break-glass root account.",
      "Locked the origin to Cloudflare with a systemd-managed iptables chain on Docker's DOCKER-USER path. It drops any new 80/443 connection that isn't from Cloudflare, the LAN or the tailnet, and it matches on the original destination port via conntrack so Docker's NAT can't slip past it.",
      "Hardened the reverse proxy: Caddy trusts only Cloudflare as an upstream proxy, rebuilds the real client IP from CF-Connecting-IP, adds HSTS/nosniff/frame/referrer headers to every site, and rewrites X-Forwarded-For so backend lockouts and rate limits see actual clients.",
      "Replaced exposed admin ports with a Tailscale subnet router, so the whole LAN is reachable from a phone with nothing extra open to the internet.",
      "Ran in-place major upgrades with snapshots and rollback paths first: Jellyfin 10.11 to 12.4 including plugin migration, and the chat backend onto MongoDB 8, Valkey and S3-compatible object storage.",
      "Rebased a custom fork of the chat web client (SolidJS + Vite) from v0.10 to v0.16. Carried over SSO login, branding, 1440p60/4K30 screen share with explicit RTCRtpSender bitrate tuning, high-quality Opus audio, and camera background blur.",
      "Debugged a camera feed that vanished on iPhone whenever blur was on. LiveKit server logs showed the track muting seconds after publish, so I upgraded the track-processor library and made blur fail-safe: if a browser can't blur, the call keeps its video instead of dropping it.",
    ],
    outcome:
      "One passkey login across every service, an origin that refuses anything that didn't come through Cloudflare, admin access only over the tailnet, and a chat app that tracks upstream while keeping its own features, with a backup and rollback path behind every upgrade.",
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
