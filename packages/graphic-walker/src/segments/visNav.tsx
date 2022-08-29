import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import PureTabs, { ITabOption } from "../components/tabs/pureTab";
import { useGlobalStore } from "../store";

const ADD_KEY = '_add';

const VisNav: React.FC = (props) => {
    const { vizStore, commonStore } = useGlobalStore();
    const { visIndex, visList } = vizStore;
    const { currentDataset } = commonStore;
    const tabs: ITabOption[] = visList.map((v) => ({
        key: v.visId,
        label: v.name || "vis",
    }))
    tabs.push({
        key: ADD_KEY,
        label: '+ 新建'
    })

    const visSelectionHandler = useCallback((tabKey: string, tabIndex: number) => {
        if (tabKey === ADD_KEY) {
            vizStore.saveVisChange();
            vizStore.addVisualization();
            vizStore.initMetaState(currentDataset)
        } else {
            vizStore.saveVisChange();
            vizStore.selectVisualization(tabIndex);
        }
    }, [currentDataset, vizStore])

    const editLabelHandler = useCallback((content: string, tabIndex: number) => {
        vizStore.setVisName(tabIndex, content)
    }, [])

    return (
        <PureTabs
            selectedKey={visList[visIndex].visId}
            tabs={tabs}
            onEditLabel={editLabelHandler}
            onSelected={visSelectionHandler}
        />
    );
};

export default observer(VisNav);
