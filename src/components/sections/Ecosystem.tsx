"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { Users, Truck, Building, Zap, DollarSign, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeItem {
  id: string;
  name: string;
  description: string;
  connection: string;
  icon: React.ComponentType<any>;
}

export const Ecosystem = () => {
  const [activeNode, setActiveNode] = useState<string>("technology");

  const nodes: NodeItem[] = [
    {
      id: "technology",
      name: "Technology Platforms",
      icon: Cpu,
      description: "Our proprietary OS, OptiFyn, powers routing, driver dispatching, battery temperature monitoring, and real-time charging reservation pings.",
      connection: "Provides predictive analytics and active system coordination across all nodes."
    },
    {
      id: "drivers",
      name: "Trained Drivers",
      icon: Users,
      description: "Empowered professional drivers onboarding via INFYNITY. Provided with complete welfares, medical checkups, micro-finance options, and active EV routing.",
      connection: "Fulfills last-mile delivery demands with high efficiency and customer satisfaction."
    },
    {
      id: "vehicles",
      name: "Smart EVs",
      icon: Truck,
      description: "State-of-the-art electric 2-wheelers and 3-wheelers connected to our telemetry, assuring battery life integrity and peak load operation.",
      connection: "Feeds telemetry data back into the technology platform while executing delivery logistics."
    },
    {
      id: "enterprises",
      name: "Enterprises",
      icon: Building,
      description: "Major quick-commerce, eCommerce, and logistics clients placing high-volume demand on our network with strict SLA expectations.",
      connection: "Generates daily commercial revenue and payload volume across the ecosystem."
    },
    {
      id: "charging",
      name: "Charging Infrastructure",
      icon: Zap,
      description: "Exponent, Honda swap-networks, and Sunmobility charge hubs. Integrated into the OptiFyn app, directing drivers to swap points before their charge drops below 15%.",
      connection: "Guarantees zero range anxiety and maximum vehicle uptime during active delivery shifts."
    },
    {
      id: "financing",
      name: "Financing Partners",
      icon: DollarSign,
      description: "Flexible vehicle leases, rent-to-own models, and microfinance networks integrated within Refynd to lower capital barriers for operators.",
      connection: "Provides capital liquidity to keep sourcing new smart assets into our ecosystem."
    }
  ];

  const activeNodeData = nodes.find((n) => n.id === activeNode) || nodes[0];

  return (
    <section id="vision-&-mission" className="py-20 px-6 md:px-12 bg-[#080808] relative overflow-hidden font-barlow">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Ecosystem Operations"
          title="The Connected EV Supply Chain"
          description="Fyn operates a full-stack integrated ecosystem. By aligning all nodes in real-time, we create a closed-loop system that eliminates operational friction."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          {/* Node Selection Selector */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-fyn-text-muted font-bold mb-4">
              Select an Ecosystem Node to Inspect Connections:
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3">
              {nodes.map((node) => {
                const Icon = node.icon;
                const isSelected = node.id === activeNode;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node.id)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                      isSelected
                        ? "bg-fyn-tint border-fyn-pink text-fyn-text shadow-[0_0_15px_rgba(232,25,122,0.1)]"
                        : "bg-fyn-surface border-fyn-border/40 text-fyn-text-muted hover:border-fyn-border hover:text-fyn-text"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isSelected ? "text-fyn-pink" : "text-fyn-text-muted"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider">{node.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Connected Hub Visualizer */}
          <div className="lg:col-span-7">
            <GlowCard className="bg-[#0b0b0b] border-fyn-border/50 p-8 min-h-[420px] flex flex-col justify-between" glowColor="rgba(232, 25, 122, 0.12)">
              <div className="relative">
                {/* Simulated connection lines & central hub indicator */}
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-fyn-border/40">
                  <div className="w-3 h-3 rounded-full bg-fyn-pink animate-ping" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink font-semibold">
                    Node: {activeNodeData.name} — Real-time telemetry connection active
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNodeData.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight mb-4">
                      {activeNodeData.name}
                    </h3>
                    
                    <p className="text-base text-fyn-text-muted leading-relaxed mb-6">
                      {activeNodeData.description}
                    </p>

                    <div className="p-4 rounded-xl bg-[#121212] border border-fyn-border/30">
                      <div className="text-xs font-mono uppercase tracking-widest text-fyn-pink font-semibold mb-2">
                        Cross-Node Synergies
                      </div>
                      <p className="text-sm text-fyn-text-muted leading-relaxed">
                        {activeNodeData.connection}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Technical readout details */}
              <div className="mt-8 pt-6 border-t border-fyn-border/30 flex flex-wrap gap-4 text-[10px] font-mono text-fyn-text-muted/40 uppercase tracking-widest">
                <span>Ecosystem Protocol: FYN_LINK_v2.0</span>
                <span>System status: fully operational</span>
                <span>Latency: 14ms</span>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
};
