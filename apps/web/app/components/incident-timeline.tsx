"use client"

import type { IncidentWithCamera } from "../../lib/types"
import { Clock, AlertTriangle, Calendar, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import clsx from "clsx"

interface IncidentTimelineProps {
  incidents: IncidentWithCamera[]
  onIncidentSelect: (incident: IncidentWithCamera) => void
}

export function IncidentTimeline({ incidents, onIncidentSelect }: IncidentTimelineProps) {
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const incidentsInTimeline = incidents.filter((i) => new Date(i.tsStart) > twentyFourHoursAgo)


  const cameras: { [cameraId: string]: { name: string, incidents: typeof incidents } } = {}
  incidentsInTimeline.forEach((incident) => {
    if (!incident.camera) return
    if (!cameras[incident.camera.id]) {
      cameras[incident.camera.id] = { name: incident.camera.name, incidents: [] }
    }
    (cameras[incident.camera.id]?.incidents ?? []).push(incident)
  })
  const cameraList = Object.entries(cameras)

  const getPosition = (ts: string) => {
    const timestamp = new Date(ts).getTime()
    const timelineStart = twentyFourHoursAgo.getTime()
    const totalDuration = now.getTime() - timelineStart
    return ((timestamp - timelineStart) / totalDuration) * 100
  }

  const formatTime = (ts: string) => {
    return new Date(ts).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const getTimeMarkers = () => {
    const markers = []
    for (let i = 0; i <= 24; i += 2) {
      const time = new Date(twentyFourHoursAgo.getTime() + i * 60 * 60 * 1000)
      const position = (i / 24) * 100
      markers.push({ time, position })
    }
    return markers
  }

  const getSeverityColor = (incident: IncidentWithCamera) => {
  
    const colors = [
      "bg-red-500 border-red-400 shadow-red-500/50",
      "bg-yellow-500 border-yellow-400 shadow-yellow-500/50",
      "bg-green-500 border-green-400 shadow-green-500/50",
      "bg-blue-500 border-blue-400 shadow-blue-500/50",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Calculate current time indicator position
  const currentTimePosition = (() => {
    const timelineStart = twentyFourHoursAgo.getTime();
    const totalDuration = now.getTime() - timelineStart;
    const nowPos = ((now.getTime() - timelineStart) / totalDuration) * 100;
    return nowPos;
  })();

  return (
    <div className="bg-[#19191c] rounded-2xl p-0 mt-6 border border-[#23262B] shadow-2xl overflow-hidden">
      {/* Player Controls */}
      <div className="flex items-center gap-6 px-6 py-3 bg-black border-b border-[#23262B] text-white">
        <SkipBack className="w-6 h-6 cursor-pointer" onClick={() => alert('This feature will be added soon.')} />
        <SkipBack className="w-6 h-6 cursor-pointer" onClick={() => alert('This feature will be added soon.')} />
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white cursor-pointer" onClick={() => alert('This feature will be added soon.') }>
          <span className="flex items-center justify-center w-full h-full">
            <Play className="w-6 h-6 text-black" fill="black" style={{ display: 'block', margin: 'auto' }} />
          </span>
        </div>
        <SkipForward className="w-6 h-6 cursor-pointer" onClick={() => alert('This feature will be added soon.')} />
        <SkipForward className="w-6 h-6 cursor-pointer" onClick={() => alert('This feature will be added soon.')} />
        <span className="ml-6 text-base font-mono text-white">03:12:37 (15-Jun-2025)</span>
        <span className="ml-6 text-base font-mono text-white">1x</span>
        <div className="flex-1" />
        <Clock className="w-6 h-6 cursor-pointer" onClick={() => alert('This feature will be added soon.')} />
      </div>

      {/* Timeline Header */}
      <div className="flex items-center px-6 py-2 bg-[#19191c] border-b border-[#23262B]" style={{ minHeight: 44 }}>
        <h3 className="text-[15px] font-semibold text-white leading-tight tracking-tight mr-8" style={{fontFamily: 'Inter, sans-serif', minWidth: 120}}>Camera List</h3>
        <div className="flex-1 flex justify-between relative">
          {getTimeMarkers().map((marker, idx) => (
            <span key={idx} className="text-[10px] text-[#A1A1AA] font-mono font-medium tracking-tight" style={{minWidth: 36, textAlign: 'center'}}>
              {marker.time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline Rows */}
      <div className="divide-y divide-[#23262B] relative">
        {/* Yellow vertical time indicator */}
        <div className="absolute top-0 left-0 h-full z-20 pointer-events-none" style={{ left: `calc(${currentTimePosition}% + 176px)`, width: 2 }}>
          <div className="w-0.5 h-full bg-yellow-400" style={{ boxShadow: '0 0 8px 2px #fde047' }} />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[10px] font-mono px-1.5 py-0.5 rounded shadow-lg border border-yellow-300" style={{fontFamily: 'Inter, sans-serif', minWidth: 60, textAlign: 'center'}}>
            {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
          </div>
        </div>
        {cameraList.map(([cameraId, { name, incidents }], rowIdx) => (
          <div key={cameraId} className="flex items-center h-16 relative bg-[#19191c]" style={{ minHeight: 56 }}>
            {/* Camera Name */}
            <div className="flex items-center w-44 pl-4 pr-2 text-white text-xs font-medium gap-2 min-w-[176px]" style={{fontFamily: 'Inter, sans-serif'}}>
              <span className="inline-block"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" stroke="#A1A1AA" strokeWidth="1.5"/><circle cx="7.5" cy="12" r="1.5" fill="#A1A1AA"/></svg></span>
              <span>{name}</span>
            </div>
            {/* Timeline Bar for this camera */}
            <div className="flex-1 relative h-full">
              {/* Timeline Grid Lines */}
              {getTimeMarkers().map((marker, idx) => (
                <div key={idx} className="absolute top-0 h-full w-px bg-[#35383F]" style={{ left: `${marker.position}%` }} />
              ))}
              {/* Incidents for this camera */}
              {incidents.map((incident, idx) => {
                const position = getPosition(incident.tsStart)
                let color = "bg-[#7C2D12] border-[#B45309] text-[#FDE68A]";
                let icon = <AlertTriangle className="w-3.5 h-3.5 text-[#F59E42]" />;
                let label = incident.type;
                let pillClass = "";
                let timeBadge = null;
                if (incident.type === "Face Recognised") {
                  color = "bg-[#1E40AF] border-[#2563EB] text-white";
                  icon = <svg className="w-3.5 h-3.5 text-[#60A5FA]" fill="none" viewBox="0 0 24 24"><path stroke="#60A5FA" strokeWidth="1.5" d="M15.5 9.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0Z"/><path stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" d="M4.5 19.5V17a4 4 0 014-4h7a4 4 0 014 4v2.5"/></svg>;
                  pillClass = "px-3 py-1 rounded bg-[#1E40AF] border border-[#2563EB] text-xs font-semibold flex items-center gap-1 shadow-md";
                  timeBadge = <span className="ml-2 px-2 py-0.5 rounded bg-[#2563EB] text-white text-[10px] font-mono font-bold" style={{letterSpacing: 0.5}}>{formatTime(incident.tsStart)}</span>;
                } else if (incident.type === "Gun Threat") {
                  color = "bg-[#991B1B] border-[#7F1D1D] text-white";
                  icon = <AlertTriangle className="w-3.5 h-3.5 text-[#F87171]" />;
                  pillClass = "px-3 py-1 rounded bg-[#991B1B] border border-[#7F1D1D] text-xs font-semibold flex items-center gap-1 shadow-md";
                } else if (incident.type === "Traffic congestion") {
                  color = "bg-[#134E4A] border-[#14B8A6] text-[#6EE7B7]";
                  icon = <svg className="w-3.5 h-3.5 text-[#14B8A6]" fill="none" viewBox="0 0 24 24"><path stroke="#14B8A6" strokeWidth="1.5" d="M12 17v-6m0 0-3 3m3-3 3 3"/><circle cx="12" cy="12" r="9" stroke="#14B8A6" strokeWidth="1.5"/></svg>;
                  pillClass = "px-3 py-1 rounded bg-[#134E4A] border border-[#14B8A6] text-xs font-semibold flex items-center gap-1 shadow-md";
                } else if (incident.type === "Multiple Events") {
                  color = "bg-[#27272A] border-[#52525B] text-[#D4D4D8]";
                  icon = <AlertTriangle className="w-3.5 h-3.5 text-[#A1A1AA]" />;
                  pillClass = "px-3 py-1 rounded bg-[#27272A] border border-[#52525B] text-xs font-semibold flex items-center gap-1 shadow-md";
                } else if (incident.type === "Unauthorised Access") {
                  color = "bg-[#7C2D12] border-[#B45309] text-[#FDE68A]";
                  icon = <AlertTriangle className="w-3.5 h-3.5 text-[#F59E42]" />;
                  pillClass = "px-3 py-1 rounded bg-[#7C2D12] border border-[#B45309] text-xs font-semibold flex items-center gap-1 shadow-md";
                } else {
                  pillClass = "px-3 py-1 rounded border text-xs font-semibold flex items-center gap-1 shadow-md";
                }
                return (
                  <div
                    key={incident.id}
                    className={clsx("absolute flex items-center group cursor-pointer z-10", "top-1/2 -translate-y-1/2")}
                    style={{ left: `${position}%` }}
                    onClick={() => onIncidentSelect(incident)}
                  >
                    {/* Incident Label */}
                    <div className={pillClass} style={{fontFamily: 'Inter, sans-serif', minWidth: 'max-content', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)'}}>
                      {icon}
                      <span>{label}</span>
                      {timeBadge}
                    </div>
                    {/* Hover Tooltip */}
                    <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                      <div className="bg-[#23262B] border border-[#35383F] rounded-lg p-3 shadow-xl min-w-48">
                        <div className="flex items-center gap-2 mb-1">
                          {icon}
                          <span className="text-white font-semibold text-xs" style={{fontFamily: 'Inter, sans-serif'}}>{label} #{incident.id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#A1A1AA] text-[10px]">
                          <Calendar className="w-3 h-3" />
                          <span>{formatTime(incident.tsStart)}</span>
                        </div>
                        {incident.camera && (
                          <div className="text-[#A1A1AA] text-[10px] mt-1">Camera: {incident.camera.name}</div>
                        )}
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#23262B] border-r border-b border-[#35383F] rotate-45" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Labels */}
      <div className="flex justify-between mt-2 px-48 pb-2">
        <span className="text-[10px] text-[#A1A1AA] font-semibold" style={{fontFamily: 'Inter, sans-serif'}}>00:00</span>
        <span className="text-[10px] text-[#A1A1AA] font-semibold" style={{fontFamily: 'Inter, sans-serif'}}>16:00</span>
      </div>

      {/* Summary Stats */}
      {incidentsInTimeline.length > 0 && (
        <div className="mt-2 p-4 bg-[#23262B] rounded-xl border border-[#35383F]">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white" style={{fontFamily: 'Inter, sans-serif'}}>{incidentsInTimeline.length}</div>
              <div className="text-xs text-[#A1A1AA]">Total Incidents</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#F87171]" style={{fontFamily: 'Inter, sans-serif'}}>
                {
                  incidentsInTimeline.filter((i) => new Date(i.tsStart) > new Date(now.getTime() - 60 * 60 * 1000))
                    .length
                }
              </div>
              <div className="text-xs text-[#A1A1AA]">Last Hour</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#F59E42]" style={{fontFamily: 'Inter, sans-serif'}}>
                {new Set(incidentsInTimeline.map((i) => i.camera?.id)).size}
              </div>
              <div className="text-xs text-[#A1A1AA]">Cameras</div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {incidentsInTimeline.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#23262B] rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-[#35383F]" />
          </div>
          <p className="text-[#A1A1AA]">No incidents in the last 24 hours</p>
          <p className="text-[#35383F] text-sm mt-1">Your security system is running smoothly</p>
        </div>
      )}
    </div>
  )
}