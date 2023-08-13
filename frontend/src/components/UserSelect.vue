<script>
import axios from 'axios'
export default {
  name: 'UserSelect'
}
</script>
<template>
  <div class="row mt-5">
    <div class="col-md-3">
      <div class="card text-white bg-primary mb-3" style="max-width: 18rem">
        <div class="card-header">Profile</div>
        <div class="card-body">
          <h5 class="card-title">Your Name</h5>
          <p class="card-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit vitae repellat adipisci
            cumque perspiciatis voluptatum iste sequi quisquam odio consectetur, veritatis ipsum
            iure illum. Repudiandae totam quos perspiciatis maiores doloribus.
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <div class="form-group">
        <label for="exampleFormControlTextarea1">What are you thinking about?</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary mt-3">Post</button>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk of the card's
        content.
      </p>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-primary mr-3">Like</button>
        <button type="button" class="btn btn-primary ml-3">Comment</button>
      </div>
    </div>
  </div>
</template>
