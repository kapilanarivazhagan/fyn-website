"use client";

import React, { useState, useEffect } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { DashboardCard } from "../ui/DashboardCard";
import { MetricCard } from "../ui/MetricCard";
import { impactMetrics, monthlyPerformanceData } from "@/data/metrics";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import { GlowCard } from "../ui/GlowCard";

export const FleetImpact = () => {
  const [mounted, setMounted] = useState(false);
  const [activeMetricTab, setActiveMetricTab] = useState<"kms" | "co2">("kms");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Live telemetry notifications mock
  const [telemetryLogs, setTelemetryLogs] = useState([
    "HUB_BLR_01: EV dispatched successfully (TVS iQube)",
    "HUB_MAS_02: Battery swapped at Sunmobility (Piaggio Ape)",
    "HUB_HYD_01: Charge alert at 18%, redirected to Exponent",
    "SYSTEM: Net CO2 saved: 5,122 tons",
    "HUB_BLR_03: Driver online, battery state 98%"
  ]);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      const cities = ["BLR", "MAS", "HYD"];
      const events = [
        "EV dispatched successfully (Euler HiLoad)",
        "Battery swapped at Honda e-swap hub",
        "Delivery SLA completed, route closed",
        "Charge alert, redirected to Exponent Energy",
        "Driver online, telemetry connected"
      ];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const event = events[Math.floor(Math.random() * events.length)];
      const log = `HUB_${city}_0${Math.floor(Math.random() * 5) + 1}: ${event}`;

      setTelemetryLogs((prev) => [log, ...prev.slice(0, 4)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <section id="what-we-do" className="py-20 px-6 md:px-12 bg-[#080808] relative overflow-hidden font-barlow">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fyn-pink/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Live Operations"
          title="Fleet & Impact Dashboard"
          description="Step into the Fyn EV Control Center. Monitor live green kilometers, active vehicle telemetry logs, and dynamic carbon reductions."
        />

        {/* Dynamic Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactMetrics.slice(0, 4).map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <MetricCard
                value={metric.value}
                label={metric.label}
                sublabel={metric.sublabel}
                description={metric.description}
                iconName={metric.iconName}
              />
            </motion.div>
          ))}
        </div>

        {/* Dashboard Split Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recharts Area Container */}
          <div className="lg:col-span-8">
            <DashboardCard
              title="Green Kilometers & Carbon Offsets"
              subtitle="Growth performance over last 6 operational months"
              headerRight={
                <div className="flex bg-[#121212] border border-fyn-border/40 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveMetricTab("kms")}
                    className={`px-3 py-1 text-xs font-bold uppercase rounded-md transition-colors cursor-pointer ${
                      activeMetricTab === "kms"
                        ? "bg-fyn-pink text-fyn-text"
                        : "text-fyn-text-muted hover:text-fyn-text"
                    }`}
                  >
                    KMs
                  </button>
                  <button
                    onClick={() => setActiveMetricTab("co2")}
                    className={`px-3 py-1 text-xs font-bold uppercase rounded-md transition-colors cursor-pointer ${
                      activeMetricTab === "co2"
                        ? "bg-fyn-pink text-fyn-text"
                        : "text-fyn-text-muted hover:text-fyn-text"
                    }`}
                  >
                    Trees CO2
                  </button>
                </div>
              }
            >
              <div className="h-[300px] w-full mt-4 flex items-center justify-center">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyPerformanceData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorKms" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E8197A" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#E8197A" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(232, 25, 122, 0.05)" />
                      <XAxis
                        dataKey="month"
                        stroke="#7A7A75"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#7A7A75"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) =>
                          activeMetricTab === "kms"
                            ? `${(value / 1000000).toFixed(1)}M`
                            : `${value}`
                        }
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#161616",
                          border: "1px solid rgba(232, 25, 122, 0.2)",
                          borderRadius: "8px",
                          fontFamily: "var(--font-barlow)",
                        }}
                        labelClassName="text-fyn-text font-bold"
                        itemStyle={{ color: "#F4F4EF" }}
                      />
                      <Area
                        type="monotone"
                        dataKey={activeMetricTab === "kms" ? "greenKms" : "co2Saved"}
                        stroke="#E8197A"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorKms)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <Activity className="w-8 h-8 text-fyn-pink animate-spin" />
                    <span className="text-xs text-fyn-text-muted">Loading Telemetry Charts...</span>
                  </div>
                )}
              </div>
            </DashboardCard>
          </div>

          {/* Telemetry log & city expansion column */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {/* Live Ticker log */}
            <DashboardCard
              title="Live Telemetry Log"
              subtitle="Predictive notifications feed"
              className="flex-1"
            >
              <div className="h-[200px] overflow-hidden flex flex-col justify-start space-y-3 font-mono text-[11px] mt-2">
                {telemetryLogs.map((log, idx) => (
                  <motion.div
                    key={`${log}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start space-x-2 text-left border-b border-fyn-border/20 pb-2"
                  >
                    <span className="text-fyn-pink font-bold flex-shrink-0">&gt;&gt;</span>
                    <span className="text-fyn-text-muted leading-tight">{log}</span>
                  </motion.div>
                ))}
              </div>
            </DashboardCard>

            {/* Hub stats card */}
            <GlowCard className="p-6 flex flex-col justify-between" glowColor="rgba(232, 25, 122, 0.08)">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 border border-fyn-pink/20 px-2 py-0.5 rounded w-fit">
                  Operational Density
                </span>
                
                <h4 className="text-xl font-black text-fyn-text uppercase mt-4 mb-2 tracking-tight">
                  Hub expansion index
                </h4>
                
                <p className="text-xs text-fyn-text-muted leading-relaxed">
                  Consistently doubling capacities across Bengaluru, Chennai, and Hyderabad. Adding 2 core logistics charging terminals in 2026.
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-fyn-border/40 pt-4 mt-6">
                <div>
                  <span className="text-[9px] font-mono text-fyn-text-muted uppercase tracking-widest block">YoY Metric</span>
                  <span className="text-xl font-bold text-fyn-pink uppercase tracking-tight">2X GROWTH</span>
                </div>
                <div className="w-1.5 h-6 bg-fyn-border rounded-full overflow-hidden">
                  <div className="w-full h-2/3 bg-fyn-pink" />
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
};
