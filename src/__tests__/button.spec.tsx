import { describe } from 'node:test';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button from '../components/common/button';

describe('Button', ()=>{
	it('onClick', ()=>{
		const onClick = jest.fn();
		const dom = render(<Button text='btn' shadow={'md'} onClick={onClick} />);
		const btn = dom.getByRole('button');
		fireEvent.click(btn);
		expect(onClick).toBeCalled();
	});
});