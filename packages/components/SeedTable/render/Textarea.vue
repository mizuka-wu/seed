<!-- @format -->

<template functional>
  <el-popover
    placement="top-start"
    trigger="hover"
    width="300"
    :disabled="(props.data || '').length < 50"
  >
    <code>{{ props.data }}</code>
    <div slot="reference">
      {{
        (props.data || "").length > 50
          ? props.data.substring(0, 48) + "..."
          : props.data
      }}
    </div>
  </el-popover>
</template>

<script>
export default {
  props: ["column", "data"]
};
</script>
