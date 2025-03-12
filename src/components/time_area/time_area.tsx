import { parserPixelToTime } from '@/utils/deal_data';
import React, { FC, useEffect, useRef, useState } from 'react';
import { AutoSizer, Grid, GridCellRenderer, OnScrollParams } from 'react-virtualized';
import { CommonProp } from '../../interface/common_prop';
import { prefix } from '../../utils/deal_class_prefix';
import * as styles from './time_area.less';

/** Animation Timeline Component Parameters */
export type TimeAreaProps = CommonProp & {
  /** Left scroll offset */
  scrollLeft: number;
  /** Scroll callback, used for synchronous scrolling */
  onScroll: (params: OnScrollParams) => void;
  /** Set cursor position */
  setCursor: (param: { left?: number; time?: number }) => void;

  nudgeByPixels: (pixels: number) => void;
};

/** Animation Timeline Component */
export const TimeArea: FC<TimeAreaProps> = ({
  setCursor,
  maxScaleCount,
  hideCursor,
  scale,
  scaleWidth,
  scaleCount,
  scaleSplitCount,
  startLeft,
  scrollLeft,
  onClickTimeArea,
  getScaleRender,
  nudgeByPixels,
}) => {
  const gridRef = useRef<Grid>();
  const interactRef = useRef<HTMLDivElement>(null);

  /** Whether to display subdivision scale */
  const showUnit = scaleSplitCount > 0;

  /** Cell renderer */
  const cellRenderer: GridCellRenderer = ({ columnIndex, key, style }) => {
    const isShowScale = showUnit ? columnIndex % scaleSplitCount === 0 : true;
    const classNames = [styles.timeUnit];
    if (isShowScale) classNames.push(styles.timeUnitBig);
    const item = (showUnit ? columnIndex / scaleSplitCount : columnIndex) * scale;
    return (
      <div
        key={key}
        style={{ ...style, userSelect: 'none' }}
        className={classNames.join(' ')}
      >
        {isShowScale && <div className={styles.timeUnitScale}>{getScaleRender ? getScaleRender(item) : item}</div>}
      </div>
    );
  };

  useEffect(() => {
    gridRef.current?.recomputeGridSize();
  }, [scaleWidth, startLeft]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaX } = e;
      nudgeByPixels(deltaX);
    };

    interactRef.current?.addEventListener('wheel', handleWheel);

    return () => {
      interactRef.current?.removeEventListener('wheel', handleWheel);
    };
  }, [interactRef]);

  const getColumnWidth = (data: { index: number }) => {
    switch (data.index) {
      case 0:
        return startLeft;
      default:
        return showUnit ? scaleWidth / scaleSplitCount : scaleWidth;
    }
  };
  const estColumnWidth = getColumnWidth({ index: 1 });
  return (
    <div className={styles.timeArea}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <>
              <Grid
                ref={gridRef}
                className={styles.virtualGrid}
                columnCount={showUnit ? scaleCount * scaleSplitCount + 1 : scaleCount}
                columnWidth={getColumnWidth}
                estimatedColumnSize={estColumnWidth}
                rowCount={1}
                rowHeight={height}
                width={width}
                height={height}
                overscanRowCount={0}
                overscanColumnCount={10}
                cellRenderer={cellRenderer}
                scrollLeft={scrollLeft}
              ></Grid>
              <div
                style={{ width, height }}
                onClick={(e) => {
                  if (hideCursor) return;
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  const position = e.clientX - rect.x;
                  const left = Math.max(position + scrollLeft, startLeft);
                  if (left > maxScaleCount * scaleWidth + startLeft - scrollLeft) return;

                  const time = parserPixelToTime(left, { startLeft, scale, scaleWidth });
                  const result = onClickTimeArea && onClickTimeArea(time, e);
                  if (result === false) return; // 返回false时阻止设置时间
                  setCursor({ time });
                }}
                onMouseMove={(e) => {
                  if (e.buttons === 1) {
                    if (hideCursor) return;
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    const position = e.clientX - rect.x;
                    const left = Math.max(position + scrollLeft, startLeft);
                    if (left > maxScaleCount * scaleWidth + startLeft - scrollLeft) return;

                    const time = parserPixelToTime(left, { startLeft, scale, scaleWidth });
                    const result = onClickTimeArea && onClickTimeArea(time, e);
                    if (result === false) return; // 返回false时阻止设置时间
                    setCursor({ time });
                  }
                }}
                ref={interactRef}
                className={styles.timeAreaInteract}
              ></div>
            </>
          );
        }}
      </AutoSizer>
    </div>
  );
};
