<template>
  <div id="properties">
    <h1>Podrobnosti</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Identifikačné číslo</h2>
          <p>{{components.appProperties._id}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Názov vozidla</h2>
          <p>{{components.appProperties.name}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Kuriér</h2>
          <p>{{components.appProperties.courier.userName}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Email</h2>
          <p>{{components.appProperties.courier.email}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Typ vozidla</h2>
          <p>{{components.appProperties.type.name}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Identifikačné číslo typu</h2>
          <p>{{components.appProperties.type._id}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Bol vytvorený</h2>
          <p>{{formatDateTime(components.appProperties.createdAt)}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Naposledy modifikovaný</h2>
          <p>{{formatDateTime(components.appProperties.updatedAt)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'properties',
  props: ['activeEl', 'vehicle'],
  data: function () {
    return {
      components: {
        appProperties: {
          _id: 'Identifikačné číslo vozidla',
          name: 'Značka a seria vozidla',
          courier: {
            userName: 'Používeteľské meno kuriéra',
            email: 'Emailová adresa kuriéra'
          },
          type: {
            _id: 'Identifikačné číslo typ vozidla',
            name: 'Popis typ vozidla'
          },
          createdAt: 'Dátum vytvorenia',
          updatedAt: 'Dátum modifikovania'
        }
      }
    }
  },
  watch: {
    'activeEl.vehicleId': function (newValue, oldValue) {
      if (this.activeEl.vehicleId === 0) return Object.assign(this.$data, this.$options.data.apply(this))
      this.components.appProperties = this.vehicle
    }
  },
  methods: {
    formatDateTime: function (timestamp) {
      const dateTime = new Date(timestamp)
      if (timestamp === this.components.appProperties.updatedAt) return this.components.appProperties.updatedAt
      if (timestamp === this.components.appProperties.createdAt) return this.components.appProperties.createdAt
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
