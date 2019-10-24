import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/ui';
import d3 from 'd3';
import sankey from 'd3-plugins-sankey';
import _ from 'lodash';
import { SankeyOptions } from 'types';

interface Props extends PanelProps<SankeyOptions> {}

export class SankeyPanel extends PureComponent<Props> {
  render() {
    const { options } = this.props;
    const margin = { top: 10, right: 0, bottom: 10, left: 0 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    //const formatNumber = d3.format(',.0f');
    //const format = (d = 0) => formatNumber(d);

    const sankey = d3
      .sankey()
      .size([width, height])
      .nodeWidth(15)
      .nodePadding(10);

    const path = sankey.link();

    const graph = {
      nodes: _.cloneDeep(options.nodes),
      links: _.cloneDeep(options.links),
    };

    sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

    const links = graph.links.map((link: any, i: any) => {
      return (
        <g>
          <path key={i} className="link" d={path(link)} style={{ strokeWidth: Math.max(1, link.dy) }}>
            <title>{link.source.name + ' → ' + link.target.name}</title>
          </path>
        </g>
      );
    });

    const nodes = graph.nodes.map((node: any, i: any) => {
      return (
        <g key={i} className="node" transform={'translate(' + node.x + ',' + node.y + ')'}>
          <rect height={node.dy} width={sankey.nodeWidth()}>
            <title>{node.name}</title>
          </rect>
          {node.x >= width / 2 ? (
            <text x={-6} y={node.dy / 2} dy={'.35em'} textAnchor={'end'}>
              {node.name}
            </text>
          ) : (
            <text x={6 + sankey.nodeWidth()} y={node.dy / 2} dy={'.35em'} textAnchor={'start'}>
              {node.name}
            </text>
          )}
        </g>
      );
    });

    return (
      <React.Fragment>
        <h1>Sankey Chart</h1>
        {console.log(graph)}
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            {links}
            {nodes}
          </g>
        </svg>
      </React.Fragment>
    );
  }
}
