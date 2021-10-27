class MediaDevice {
  async getStream(constrants) {
    return await navigator.mediaDevices.getUserMedia(constrants);
  }
}

export default new MediaDevice();
