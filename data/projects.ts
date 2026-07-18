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
        │
        ▼
┌────────────────────────┐
│     OCI VPS (ens3)     │  ← NSG ingress opened to 0.0.0.0/0
└────────────────────────┘
        │  DNAT → wg0
        ▼
┌────────────────────────┐
│ WireGuard tunnel (wg0) │  ← SNAT egress, AllowedIPs 0.0.0.0/0
└────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────┐
│         Proxmox host — 10.10.10.0/24         │
│                                              │
│         ┌──────────┐   ┌──────────┐          │
│         │ Jellyfin │   │Minecraft │          │
│         └──────────┘   └──────────┘          │
│                                              │
│         ┌──────────┐   ┌──────────┐          │
│         │   KF2    │   │  Admin   │          │
│         └──────────┘   └──────────┘          │
└──────────────────────────────────────────────┘`,
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
        │  DHCP discover
        ▼
┌────────────────────────┐
│   OpenWRT DHCP relay   │  ← bridges VLAN 20 → core net
└────────────────────────┘
        │
        ▼
┌────────────────────────┐
│   PXE / DHCP server    │  ← options 66/67: bootloader + path
└────────────────────────┘
        │
        ▼
┌────────────────────────┐
│   TFTP → unattended    │
│     Ubuntu install     │
└────────────────────────┘
        │
        ▼
┌────────────────────────┐
│ Ansible (batches of 5) │  ← apps, printers, kiosk lockdown
└────────────────────────┘
        │
        ▼
┌────────────────────────┐
│      Zabbix agent      │  ← state → Slack + Grafana
└────────────────────────┘
        │
        ▼
   Kiosk ready (~8 min/station)`,
  },
];
