import React from "react";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css"
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: require('../../assets/coursethumb3.png'),
    // thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/400/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1026/1000/400/",
    thumbnail: "https://picsum.photos/id/1026/250/150/",
  },
];

class ImageSliderComponent extends React.Component {
    constructor(props) {
      super(props);
      this.myImageRef = React.createRef();
      this.onFullscreen = this.onFullscreen.bind(this);
      this.onPlay = this.onPlay.bind(this);
      this.onPause = this.onPause.bind(this);
      this.onMoveToSlide = this.onMoveToSlide.bind(this);
    }
  
    onFullscreen() {
      this.myImageRef.current.fullScreen()
    }
    onPlay() {
      this.myImageRef.current.play()
    }
    onPause() {
      this.myImageRef.current.pause()
    }
    onMoveToSlide() {
      // Index start from 0 so 2 will move to 3rd slide
      this.myImageRef.current.slideToIndex(2)
    }
  
    onEventTrigger(eventName){
      console.log('Event Name ',eventName);
    }
  
    render() {
      return (
        <div className="wrapper">
  
          <ImageGallery 
          
            items={images}  
            infinite={true}
            lazyLoad={true}
            autoPlay={true}
            slideDuration={500}
            // swipingTransitionDuration={200}
            showThumbnails={false}
            useBrowserFullscreen={false}
            showBullets={true}
    
            onSlide={() => this.onEventTrigger('onSlide')}
            onClick={() => this.onEventTrigger('onClick')}
            onTouchMove={() => this.onEventTrigger('onTouchMove')}
    
            ref={this.myImageRef} 
          />
  
          {/* <button onClick={this.onFullscreen}>FullScreen</button>
          <button onClick={this.onPlay}>Play</button>
          <button onClick={this.onPause}>Pause</button>
          <button onClick={this.onMoveToSlide}>SlideTo 3rd Slide</button> */}
        </div>
      );
    }
  }
  export default ImageSliderComponent;