<template>
  <div id="properties">
    <h1>Podrobnosti</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Identifikačné číslo</h2>
          <p>{{appProperties.form.values._id}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Názov vozidla</h2>
          <p>{{appProperties.form.values.name}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Kuriér</h2>
          <p>{{appProperties.form.values.courier.userName}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Email</h2>
          <p>{{appProperties.form.values.courier.email}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Typ vozidla</h2>
          <p>{{appProperties.form.values.type.name}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Identifikačné číslo typu</h2>
          <p>{{appProperties.form.values.type._id}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Bol vytvorený</h2>
          <p>{{formatDateTime(appProperties.form.values.createdAt)}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Naposledy modifikovaný</h2>
          <p>{{formatDateTime(appProperties.form.values.updatedAt)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'properties',
    props: ['appProperties', 'vehicleData', 'activeEl'],
    data: function () {
      return {}
    },
    watch: {
      'activeEl.vehicleId': function (newValue, oldValue) {
        if (this.activeEl.vehicleId === 0) return Object.assign(this.$data, this.$options.data.apply(this))
        this.appProperties.form.values = this.vehicleData
      }
    },
    methods: {
      formatDateTime: function (timestamp) {
        const dateTime = new Date(timestamp)
        if (timestamp === this.appProperties.form.values.updatedAt) return this.appProperties.form.values.updatedAt
        if (timestamp === this.appProperties.form.values.createdAt) return this.appProperties.form.values.createdAt
        return `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} - ${dateTime.getHours()}:${dateTime.getMinutes()}`
      }
    }
  }
</script>

<style scoped>
  div#properties {
    height: 370px;
  }

  div#properties h1 {
    margin-top: 1em;
    margin-left: 1rem;
    font-size: 2em;
    display: inline-block;
  }

  div#properties h2 {
    font-size: 1.3em;
    font-weight: 900;
    color: #979797;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  div#properties p {
    color: #000000;
    font-size: 1em;
    font-weight: 900;
    word-break: break-all;
  }

  @media (max-width: 765px) {
    div#properties {
      height: 670px;
    }
  }
</style>
