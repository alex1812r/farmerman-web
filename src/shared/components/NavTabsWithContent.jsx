import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

export const NavTabsWithContent = ({ items, value, onChange }) => {

    const tabs = items.map((item, i) => 
        <Tab key={`tab-${i+1}`} eventKey={item.key} title={item.title}>
            {item.content}
        </Tab >
    );

    return (
        <Tabs
          activeKey={value}
          onSelect={(v) => onChange(v)}
          className="mb-3">
          {tabs}
        </Tabs>
    );
}