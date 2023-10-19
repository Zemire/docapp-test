<template>
  <div class="room-inner-wrapper container">
    <div class="row">
      <div class="col-sm-3">
       <RoomPatientInfo></RoomPatientInfo>
      </div>
      <div class="col-sm-9">
        <RoomConsentForms></RoomConsentForms>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <RoomTabs></RoomTabs>
      </div>
    </div>
  </div>
</template>

<script>
import RoomPatientInfo from "../../room-view/RoomPatientInfo.vue";
import RoomConsentForms from "../../room-view/RoomConsentForms.vue";
import RoomTabs from "../../room-view/RoomTabs.vue";

export default {
  name: "RoomDetails",
  components: {RoomTabs, RoomConsentForms, RoomPatientInfo},
}
</script>

<style scoped>

</style>