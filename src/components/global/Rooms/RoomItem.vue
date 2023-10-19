<template>
  <div
      @click="navigateToRoom(roomItem.code)"
      v-if="roomItem" class="room-item-inner-wrapper">
    <p class="room-item-number">Room {{roomItem.code}} ({{ roomItem.appointment.code }})</p>
    <p class="room-item-status">Status: {{roomItem.status.title }}</p>
    <ul class="room-item-data-list">
      <li><span>Patient:</span> {{patientFullName}}</li>
      <li><span>Appointment time:</span> {{appointmentTime}}</li>
      <li><span>Waiting time:</span> {{appointmentWaitingTime}}</li>
      <li><span>D:</span> {{roomItem.appointment.doctor_title}}</li>
      <li><span>A:</span> {{roomItem.appointment.assistant}}</li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from "pinia";
import { useRoomsStore } from "../../../stores/rooms";

export default {
  name: "RoomItem",
  props: {
    roomItem: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      timer: 0,
      difference: 0,
    }
  },
  methods: {
    updateTimer() {
      const appointmentDateTime = moment(this.roomItem.appointment.start_date + ' ' + this.roomItem.appointment.start_time, this.baseDateInputFormat + ' ' + this.baseTimeInputFormat);
      const appointmentWaitingTime = moment(this.roomItem.update_time);
      this.difference = moment.duration(appointmentDateTime - appointmentWaitingTime);
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.difference = this.difference.subtract(1,'second');
      }, 1000)
    },
    navigateToRoom(code) {
      this.$router.push({ name: 'room', params: { code } })
    }
  },
  computed: {
    ...mapState(useRoomsStore, ['baseDateInputFormat','baseTimeInputFormat','baseTimeOutputFormat']),

    patientFullName() {
      return this.roomItem.appointment.first_name + ' ' + this.roomItem.appointment.last_name
    },
    appointmentTime() {
      return moment(this.roomItem.appointment.start_time, this.baseTimeInputFormat).format(this.baseTimeOutputFormat);
    },
    appointmentWaitingTime() {
      if (this.timer === 0) {
        this.updateTimer()
      }
      return Math.floor(this.difference.as('h')) + moment.utc(this.difference.as('ms')).format(':mm:ss')
    },
  }
}
</script>

<style lang="scss" scoped>
.room-item-inner-wrapper {
  cursor: pointer;
  padding: 10px 0;
  border-radius: 5px;
  margin: 0 0 30px;
  transition: .1s all ease-in-out;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  &:hover {
    transform: scale(103%);
  }
  .room-item-number {
    text-align: center;
    border-bottom: 1px solid $main-border-color;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: 700;
  }
  .room-item-status {
    font-size: 14px;
    font-weight: 600;
    padding: 0 10px;
  }
  .room-item-data-list {
    padding-right: 10px;
    li {
      font-size: 12px;
      span {
        font-weight: 600;
      }
    }
  }
}
</style>