import { Dropdown, Form } from "react-bootstrap";
import React from "react";
import type { EntityState } from "../types/communication";

interface CustomMenuProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    'aria-labelledby'?: string;
}

const CustomMenu = React.forwardRef<HTMLDivElement, CustomMenuProps>(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = React.useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder="Type to filter..."
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter((child) => {
                        if (!React.isValidElement(child)) return false;
                        const text = String(child.props.children || '').toLowerCase();
                        return !value || text.includes(value.toLowerCase());
                    })}
                </ul>
            </div>
        );
    }
);

export default function EntityDropdown({ entities }: { entities: EntityState[] }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select Entity
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
                {entities.map(entity => (
                    <Dropdown.Item key={entity.entity_id} onClick={() => console.log(entity)}>
                        {entity.attributes.friendly_name || entity.entity_id}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}