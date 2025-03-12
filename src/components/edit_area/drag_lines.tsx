import React, { FC, useEffect, useState } from 'react';
import { prefix } from '../../utils/deal_class_prefix';
import * as styles from './drag_lines.less';

export interface DragLineData {
  isMoving: boolean;
  movePositions: number[];
  assistPositions: number[];
}

export type DragLineProps = DragLineData & { scrollLeft: number };

/** 拖拽辅助线 */
export const DragLines: FC<DragLineProps> = ({ isMoving, movePositions = [], assistPositions = [], scrollLeft }) => {
  return (
    <div className={styles.dragLineContainer}>
      {isMoving &&
        movePositions
          .filter((item) => assistPositions.includes(item))
          .map((linePos, index) => {
            return (
              <div
                key={index}
                className={styles.dragLine}
                style={{ left: linePos - scrollLeft }}
              />
            );
          })}
    </div>
  );
};
