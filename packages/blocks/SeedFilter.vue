<script>
/**
 * 内部使用SeedForm的查询条件生成系统
 */
import SeedForm from "seed-toolkit/packages/components/SeedForm/Index";
import optionsHelper from "seed-toolkit/lib/options";
import scopedSlotsHelper from "seed-toolkit/lib/scopedSlots";

export const FILTER_SCOPE = "filter";

export default {
  render() {
    const vm = this;
    const {
      $attrs,
      filterSeeds,
      handlerSearch,
      filterScopedSlots,
      show
    } = this;

    const isShowFilter = show && filterSeeds.length > 0;

    return (
      isShowFilter && (
        <el-card shadow="hover">
          <el-row>
            <SeedForm
              ref="form"
              scopedSlots={filterScopedSlots}
              props={$attrs}
              seeds={filterSeeds}
              inline
            />
          </el-row>
          <el-row>
            <el-button size="small" onClick={handlerSearch} type="primary">
              查询
            </el-button>
            <el-button size="small" onClick={() => vm.$emit("reset")}>
              重置
            </el-button>
          </el-row>
        </el-card>
      )
    );
  },
  components: {
    SeedForm
  },
  name: "SeedFilterContainer",
  props: {
    issueSlots: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      required: false,
      default: true
    },
    seeds: {
      type: Array,
      required: true
    }
  },
  computed: {
    filterSeeds: ({ seeds }) => optionsHelper(seeds, "filter"),
    filterScopedSlots({ $scopedSlots, issueSlots }) {
      const filterScopedSlots = issueSlots
        ? scopedSlotsHelper($scopedSlots, FILTER_SCOPE)
        : $scopedSlots;
      return filterScopedSlots;
    }
  },
  methods: {
    handlerSearch() {
      const form = this.$refs.form;
      this.$emit("search", form.model);
    }
  }
};
</script>
