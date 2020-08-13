import Vue, { PluginObject } from 'vue'
import * as SeedToolkit from "./seed";

import TableComponent from './components/table';

export class SeedTableComponent extends TableComponent {}

export default {
    install(Vue: typeof Vue, options: Object): void
};
