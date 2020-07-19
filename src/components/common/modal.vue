<template>
  <div id="modal">
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">{{title}}</h5>
          </div>
          <div class="modal-body">
            <p>{{text}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal">{{button}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['modalId', 'title', 'text', 'button']
}
</script>

<style scoped>
  div#modal h5 {
    font-size: 1.3em;
  }

  div#modal button {
    text-transform: inherit;
    background: #ffffff;
    border: solid 0.09rem #7f7f7f;
    border-radius: 0.5rem;
    color: #176c9d;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }

  div#modal button:hover {
    background: #176c9d;
    border-color: #176c9d;
    color: #ffffff;
  }
</style>
