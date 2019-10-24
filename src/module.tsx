//import { PureComponent } from 'react';
import { PanelPlugin } from '@grafana/ui'; //PanelProps,
import { SankeyOptions, defaults } from './types';
import { SankeyPanel } from './SankeyPanel';

export const plugin = new PanelPlugin<SankeyOptions>(SankeyPanel).setDefaults(defaults);
