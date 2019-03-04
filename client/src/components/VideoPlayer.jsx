// component with a recipe name & a video player
import React from 'react';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    const { recipe } = this.props;
    this.state = {
      currentVideo: recipe,
    };
  }

  render() {
    const { currentVideo } = this.state;
    const { recipeId, getVideoForQueryRecipe } = this.props;
    return (
      <div className="video-player">
        <div className="video-container">
          <iframe
            title="KC"
            width="560"
            height="349"
            // src={`https://www.youtube.com/embed/qz5-0mVldeE`}
            src="https://www.youtube.com/embed/qz5-0mVldeE"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
