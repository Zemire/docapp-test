<template>
  <div v-if="form.form_content" class="tab-inner-form-wrapper">
    <ul>
      <li v-for="(line, index) in form.form_content">
        <BCheckbox
          v-if="line.need_initials && !line.is_checked"
          v-model="line.is_checked"
        ></BCheckbox>
        <span v-if="line.is_checked">
          {{patientInitials}}
        </span>
        {{line.content}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia/dist/pinia";
import {useRoomsStore} from "../../../stores/rooms";

export default {
  name: "RoomTabItem",
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(useRoomsStore, ["patientInitials"]),
  },
  methods: {
    ...mapActions(useRoomsStore, ["getTabData"]),
    checkTabData(formName) {
      this.getTabData(formName);
    }
  },
  mounted() {
    console.log(this.form)
    this.checkTabData(this.form.short_title)
  }
}
</script>

<style lang="scss" scoped>
.tab-inner-form-wrapper {
  ul {
    list-style: none;
    padding: 0 20px;
    li {
      display: flex;
      padding-bottom: 10px;
      span {
        font-weight: 600;
        padding-right: 5px;
        line-height: 1.6;
        font-size: 16px;
      }
    }
  }
}
</style>