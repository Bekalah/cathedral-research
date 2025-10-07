import React, { useEffect } from 'react';
import LabScene from './LabScene';
import Plaque from './Plaque';
import { tesseract } from '../../../../packages/tesseract/bridge.js';

export default function RealmShell({ labId, title, plaque }){
  useEffect(()=>{
    const unsub = tesseract.subscribe('arcana:activated', (p)=>{
      if(p?.meta?.lab === labId){
        // can animate or react here later
        // console.log('RealmShell heard arcana activation', p);
      }
    });
    return unsub;
  },[labId]);

  return (
    <section style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:16}}>
      <div>
        <LabScene title={title} />
      </div>
      <aside>
        <Plaque title={title||labId} intention={plaque.intention} technique={plaque.technique} lineage={plaque.lineage} onAction={()=>{
          tesseract.publish('lab:enter', { labId, title });
        }}/>
      </aside>
    </section>
  );
}
