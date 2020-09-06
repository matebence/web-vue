<template>
  <div id="message">
    <div id="message-header">
      <h1>michalvelky <span class="dot"></span></h1>
    </div>
    <div id="message-panel">
      <div class="text">
        <p class="sender">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="text">
        <p class="receiver">Curabitur enim quam, placerat sed pulvinar ac, cursus eu massa.</p>
      </div>
      <div class="text">
        <p class="sender">Etiam varius lacinia libero et venenatis.</p>
      </div>
      <div class="text">
        <p class="receiver">Sed tristique, nunc vitae eleifend efficitur, nisi sem convallis nibh, ac rutrum mi massa rhoncus massa. </p>
      </div>
      <div class="text">
        <p class="sender">Proin ultrices lectus at malesuada efficitur. </p>
      </div>
      <div class="text">
        <p class="receiver">Curabitur sodales mauris ligula, iaculis ullamcorper justo volutpat maximus.</p>
      </div>
      <div class="text">
        <p class="sender">Nullam commodo euismod eros. Aenean imperdiet arcu ut condimentum aliquet. Vivamus et sapien in risus sodales placerat. </p>
      </div>
      <div class="text">
        <p class="sender">Morbi feugiat commodo tortor viverra pulvinar.</p>
      </div>
      <div class="text">
        <p class="receiver"> Integer massa lacus, congue non nibh quis, porttitor mattis augue.</p>
      </div>
      <div class="text">
        <p class="sender">Integer eget vulputate lorem. </p>
      </div>
      <div class="text">
        <p class="receiver"> Vivamus et sapien in risus sodales placerat.</p>
      </div>
      <div class="text">
        <p class="receiver"> Curabitur non gravida enim. </p>
      </div>
    </div>
    <div id="message-form">
      <form>
        <div class="form-input">
          <input type="text" name="message" id="text-message" autocomplete="off" placeholder="Napíšte správu...">
        </div>
        <div class="form-input">
          <button
            type="submit"
            class="btn btn-primary">
            Poslať
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>
  div#message div#message-header {
    position: absolute;
    width: 100%;
    z-index: 2;
    border-top-left-radius: 3rem;
    border-bottom: solid 0.01rem #868686;
    background-color: #ffffff;
  }

  div#message div#message-header h1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#message div#message-header h1 span.dot {
    height: 1rem;
    width: 1rem;
    background-color: #58bb19;
    border-radius: 50%;
    display: inline-block;
  }

  div#message div#message-panel  {
    overflow: auto;
    height: 70%;
    width: 100%;
    position: absolute;
    z-index: 1;
    bottom: 8rem;
  }

  div#message div#message-panel div.text  {
    margin-left: 2rem;
    margin-right: 2rem;
    clear: both;
  }

  div#message div#message-panel div.text p {
    width: 20rem;
    padding: 1rem;
    font-size: 0.9em;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }

  div#message div#message-panel div.text p.sender {
    float: left;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: #176c9d;
  }

  div#message div#message-panel div.text p.receiver {
    float: right;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    background-color: #187fb1;
  }

  div#message div#message-form  {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  div#message div#message-form form div.form-input {
    display: inline;
  }

  div#message div#message-form form div.form-input button {
    position: absolute;
    left: calc(93% - 7.3rem);
    top: 5%;
    width: 7rem;
    height: 2.5rem;
    margin-left: 2rem;
    border-radius: 0.7rem;
    border: none;
    background-color: #176c9d;
  }

  div#message div#message-form form div.form-input button:hover{
    background-color: #187fb1;
  }

  div#message div#message-form form div.form-input input {
    position: relative;
    width: 93%;
    height: 2.5rem;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    padding-left: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    font-size: 0.9em;
    border-radius: 0.7rem;
    border: solid 0.01rem #a1a1a1;
  }
</style>
