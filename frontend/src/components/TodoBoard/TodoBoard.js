import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';
import { useMemo, useState } from 'react';
import produce from 'immer';
import styled from 'styled-components';
import { TaskboardItem, TaskboardItemStatus } from './TaskboardTypes';
import TaskboardItemFormModal, {
    TaskboardItemFormValues,
} from './TaskboardItemFormModal';
import TaskboardCol, { TaskboardColProps } from './TaskboardCol';
import { useSyncedState } from '../shared/SharedHooks';

const generateId = () => Date.now().toString();


const TodoBoardRoot = styled.div`
  min-height: 0;
  height: 100%;
  min-width: 800px;
  max-width: 1400px;
  margin: auto;
`;

const TodoBoardContent = styled.div`
  height: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
`;

const defaultItems = {
    [TaskboardItemStatus.TO_DO]: [],
    [TaskboardItemStatus.IN_PROGRESS]: [],
    [TaskboardItemStatus.DONE]: [],
}