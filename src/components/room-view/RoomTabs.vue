<template>
  <div v-if="showTabs && selectedForms.length > 0" class="room-tabs-wrapper">
    <b-tabs>
      <b-tab
          v-for="(form, index) in selectedForms"
          :key="'form-key-' + form.code"
          :title="form.short_title"
          :lazy="true"
          :active="index === 0">
        <RoomTabItem
          :form="form"
        ></RoomTabItem>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import {mapState} from "pinia/dist/pinia";
import {useRoomsStore} from "../../stores/rooms";
import RoomTabItem from "../global/RoomTabs/RoomTabItem.vue";

export default {
  name: "RoomTabs",
  components: {RoomTabItem},
  computed: {
    ...mapState(useRoomsStore, ["showTabs","selectedForms"]),
  },
}
</script>

<style lang="scss">
.room-tabs-wrapper {
  .tab-content {
    border: 1px solid #dee2e6;
    border-top: none;
    padding: 20px 0 10px;
  }
}
</style>