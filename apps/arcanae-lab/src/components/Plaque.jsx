import React from 'react';

export default function Plaque({title, intention, technique, lineage=[], onAction}) {
  return (
    <div style={{
      width:320, background:'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
      border:'1px solid rgba(255,255,255,.06)', padding:14, borderRadius:12, color:'#fff'
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong style={{fontSize:16}}>{title}</strong>
        <small style={{opacity:.7}}>Lab Plaque</small>
      </div>
      <p style={{marginTop:10, opacity:.9, lineHeight:1.45}}><em>{intention}</em></p>
      <div style={{marginTop:8, fontSize:13, opacity:.85}}>
        <div style={{fontWeight:600}}>Technique</div>
        <div style={{marginTop:6}}>{technique}</div>
      </div>
      {lineage.length > 0 && (
        <div style={{marginTop:10, fontSize:12, opacity:.75}}>
          <div style={{fontWeight:700}}>Lineage</div>
          <div style={{marginTop:6}}>{lineage.join(' · ')}</div>
        </div>
      )}
      <div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}>
        <button className="linkBtn" onClick={onAction}>{onAction ? 'Enter' : 'Open'}</button>
      </div>
    </div>
  );
}
