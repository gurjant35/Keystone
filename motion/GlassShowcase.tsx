import React, {useRef, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {AbsoluteFill, Img, useCurrentFrame, interpolate, Easing} from 'remotion';

const ease = Easing.bezier(.22, 1, .36, 1);
const clamp = {extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const Panel = ({src,label,start,end}:{src:string;label:string;start:number;end:number}) => {
 const frame = useCurrentFrame();
 const local=frame-start;
 return <AbsoluteFill style={{
  opacity:interpolate(frame,[start,start+24,end-24,end],[0,1,1,0],clamp),
  transform:`perspective(1200px) rotateY(${interpolate(local,[0,45],[2,0],{...clamp,easing:ease})}deg)`,
 }}>
  <Img src={src} style={{width:'100%',height:'100%',objectFit:'cover',
   transform:`scale(${interpolate(local,[0,240],[1.02,1.06],{...clamp,easing:Easing.inOut(Easing.sin)})})`,
  }}/>
  <div style={{position:'absolute',left:30,bottom:28,padding:'13px 20px',borderRadius:100,
   background:'rgba(247,247,244,.91)',backdropFilter:'blur(18px)',color:'#244959',
   fontFamily:'-apple-system,BlinkMacSystemFont,Inter,Arial,sans-serif',fontSize:28,fontWeight:500,
   opacity:interpolate(local,[20,45],[0,1],clamp),
  }}>{label}</div>
 </AbsoluteFill>;
};

export const GlassShowcase = () => <AbsoluteFill style={{background:'#edece8'}}>
 <Img src="images/pg-shower-hero.jpg" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
 <Panel src="images/pg-shower-hero.jpg" label="Custom shower enclosures" start={-24} end={264}/>
 <Panel src="images/gal-full-06.jpg" label="Precision-fit glass railings" start={240} end={504}/>
 <Panel src="images/pg-glass-mirror-hero.jpg" label="Mirrors made for your space" start={480} end={720}/>
 <Panel src="images/pg-shower-hero.jpg" label="Custom shower enclosures" start={696} end={960}/>
</AbsoluteFill>;

const ShowcasePlayer = () => {
 const ref=useRef<PlayerRef>(null);
 useEffect(()=>{
  const button=document.getElementById('motionToggle');
  const host=document.getElementById('glassMotion');
  let userPaused=false;
  const toggle=()=>{userPaused=!userPaused;if(userPaused)ref.current?.pause();else ref.current?.play();if(button){button.textContent=userPaused?'Play motion':'Pause motion';button.setAttribute('aria-label',userPaused?'Play showcase animation':'Pause showcase animation');}};
  button?.addEventListener('click',toggle);
  const observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting&&!userPaused)ref.current?.play();else ref.current?.pause();},{threshold:.1});
  if(host)observer.observe(host);
  const visibility=()=>{if(document.hidden)ref.current?.pause();else if(!userPaused)ref.current?.play();};
  document.addEventListener('visibilitychange',visibility);
  return()=>{button?.removeEventListener('click',toggle);observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
 },[]);
 return <Player ref={ref} component={GlassShowcase} compositionWidth={720} compositionHeight={840}
  durationInFrames={720} fps={30} autoPlay loop muted controls={false} clickToPlay={false}
  doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false}
  style={{width:'100%',height:'100%'}}/>;
};
const host=document.getElementById('glassMotion');
if(host&&!matchMedia('(prefers-reduced-motion: reduce)').matches)createRoot(host).render(<ShowcasePlayer/>);
