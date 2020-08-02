<template>
  <div>{{ dateValue }}</div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: ["value"],
  computed: {
    dateValue({ value }) {
      return new dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style></style>
