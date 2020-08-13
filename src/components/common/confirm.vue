<template>
  <div id="confirm">
    <div class="modal fade" :id="confirmId" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">{{title}}</h5>
          </div>
          <div class="modal-body">
            <p>{{text}}</p>
          </div>
          <div class="modal-footer">
            <button id="negative" type="button" data-dismiss="modal">{{negativeButton}}</button>
            <button
              id="positive"
              type="button"
              data-dismiss="modal"
              @click.prevent="confirmed()">{{positiveButton}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirm',
  props: ['confirmId', 'title', 'text', 'positiveButton', 'negativeButton'],
  methods: {
    confirmed: function () {
      return this.$emit('confirmed', true)
    }
  }
}
</script>

<style scoped>
  div#confirm h5 {
    font-size: 1.3em;
  }

  div#confirm button#positive, div#confirm button#negative {
    text-transform: inherit;
    background: #ffffff;
    border: solid 0.09rem #7f7f7f;
    border-radius: 0.5rem;
    color: #176c9d;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }

  div#confirm button#positive:hover {
    background: #176c9d;
    border-color: #176c9d;
    color: #ffffff;
  }
</style>
