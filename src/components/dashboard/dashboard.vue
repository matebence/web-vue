<template>
  <div id="dashboard">
    <div class="container-fluid">
      <div class="row navigation">
        <div class="col-sm-12 col-md-2 text-center">
          <div class="navbar-brand">
            <a href="#">
              <img src="@/assets/img/blesk-default-logo.png" alt="">
            </a>
          </div>
        </div>
        <div class="col-sm-12 col-md-10 text-center">
          <nav class="nav">
            <ul>
              <li>
                <a class="nav-link active" href="#">
                <span class="fa-stack">
                  <i class="fa fa-user-o fa-stack-1x fa-inverse"></i>
                </span>
                </a>
              </li>
              <li>
                <a class="nav-link active" href="#">
                <span class="fa-stack has-badge" data-count="8">
                  <i class="fa fa-comments-o fa-stack-1x fa-inverse"></i>
                </span>
                </a>
              </li>
              <li>
                <a class="nav-link active" href="#">
                <span class="fa-stack">
                  <i class="fa fa-sign-out fa-stack-1x fa-inverse">
                  </i>
                </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>

<style scoped>
  div.navigation {
    background: #176c9d;
    padding: 0.5rem;
    padding-left: 7rem;
    padding-right: 7rem;
  }

  div.navigation div.navbar-brand img {
    margin-top: 0.35rem;
    width: 5rem;
  }
  div.navigation nav {
    float: right;
  }

  div.navigation nav ul {
    display: inline-flex;
    margin: 0 auto;
  }

  div.navigation nav ul li a i {
    font-size: 1.3em;
    color: #ffffff;
  }

  div.navigation nav ul li a span.fa-stack[data-count]:after {
    position: absolute;
    left: 70%;
    content: attr(data-count);
    font-size: 0.7em;
    padding: .35rem;
    border-radius: 30rem;
    line-height: .60em;
    color: white;
    background: rgba(255, 0, 0, .85);
    text-align: center;
    min-width: 1rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    div.navigation {
      padding-left: 0;
      padding-right: 0;
    }

    div.navigation nav {
      float: none;
      margin-top: 1rem;
    }
  }
</style>
