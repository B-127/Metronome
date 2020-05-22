import React from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends React.Component{
  constructor(props){
    super(props);
    this.state={
      playing:false,
      count:0,
      bpm:100,
      beatspermeasure:4
    };

    this.click1=new Audio(click1);
    this.click2= new Audio(click2);
  }
  
  handleBpmChange=event=>{
    const bpm=event.target.value;
    
    if (this.state.playing){
      clearInterval(this.timer);
      this.timer=setInterval(this.playClick,(60/bpm)*1000)
      
      this.setState({
        count:0,
        bpm
      });
    }
    else{
      this.setState({bpm});
    }

  }

  playClick=()=>{
    const{count,beatspermeasure}=this.state;

    if(count%beatspermeasure===0){
      this.click2.play();
    }
    else{
      this.click1.play();
    }

    this.setState(state=>({
      count:(state.count+1)%state.beatspermeasure
    }));
  };

  startStop=()=>{
    if (this.state.playing){
      clearInterval(this.timer);
      this.setState({
        playing:false
      });
    }
    else{
      this.timer=setInterval(
        this.playClick,
        (60/this.state.bpm)*1000
      );
      this.setState({
          count:0,
          playing:true
        },
        this.playClick
      );
    }
  };

  render(){
    const{playing,bpm}=this.state;

    return (
      <div className="metronome" >
        <div className="BPM-Slider">
          <div>{bpm} BPM</div>
          <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange}/>
        </div>
        <button onClick={this.startStop}>{playing?'Stop':'Start'}</button>  
      </div>
    );
  }
}

export default Metronome;
