<template>
  <div v-if="activeRoomsList.length > 0" class="container">
    <div class="row">
      <div
          v-for="room in activeRoomsList"
          :key="'room-id-'+ room.code"
          class="col-sm-4">
        <RoomItem
          :roomItem="room"
        ></RoomItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useRoomsStore } from "../../stores/rooms";
import RoomItem from "../global/Rooms/RoomItem.vue";

export default {
  name: "Rooms",
  components: {RoomItem},
  computed: {
    ...mapState(useRoomsStore, ["activeRoomsList"]),
  },
  methods: {
    ...mapActions(useRoomsStore, ["getRoomsList"]),
  },
  mounted() {
    this.getRoomsList();
  },
}
</script>

<style lang="scss" scoped>

</style>