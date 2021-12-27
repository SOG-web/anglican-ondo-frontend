import { useState, useEffect } from 'react';
import Image from 'next/Image';
import styles from '../../styles/AdminPriests.module.css';
import AutoGrowingTextarea from '../../components/AutoGrowingTextarea/AutoGrowingTextarea';
import { FaPlusCircle as PlusIcon } from 'react-icons/fa';

const Priest = ({ name, position, image }) => {
	return (
		<div className={styles.Priest}>
			<Image height='500px' width='500px' alt={name} className={styles.Image} />
			<h3 className={styles.Name}>{ name }</h3>
			<p>{ position }</p>
			<button 
				className={[
					styles.Button, 
					styles.RemoveButton
				].join(' ')}
			>Remove</button>
		</div>
	)
}

const AddPriest = ({ name, setName, position, setPosition, image, setImage, savePriest }) => {
	return (
		<div className={[styles.Priest, styles.NewPriest].join(' ')}>
			{image ? (
				<Image height='500px' width='500px' src={URL.createObjectURL(image)} alt={name} />
			) : <PlusIcon className={styles.Image} color='var(--pri)' />}
			<AutoGrowingTextarea 
				value={name}
				onChange={e => setName(e.target.value)}
				className={[styles.Name, styles.TextareaWrapper].join(' ')} 
				placeholder='Name' 
			/>
			<AutoGrowingTextarea 
				value={position}
				onChange={e => setPosition(e.target.value)}
				className={styles.TextareaWrapper} 
				placeholder='position' 
			/>
			{name.trim() && position.trim() && image && <button onClick={savePriest} className={styles.Button}>Add</button>}
		</div>
	)
}

const Priests = () => {
	const [priests, setPriests] = useState();

	const [name, setName] = useState('');
	const [position, setPosition] = useState('');
	const [image, setImage] = useState();

	useEffect(() => {
		const getPriests = async () => {
			// get priests from  backend
			priests = []
			setPriests(priests)
		}

		getPriests();
	}, [])

	const savePriest = () => {
		const priest = { name, position, image };
		// save priest to backend

		setPriests(v => [...cloneDeep, priest]);
	}

	return (
		<div>
			<div className={styles.HeadingContainer}>
				<h1 className={styles.Heading}>Churches</h1>
			</div>
			<div className={styles.Priests}>
				{priests.map((priest, i) => {
					return (
						<Priest key={i} />
					)
				})}
				<AddPriest 
					name={name}
					setName={setName}
					position={position}
					setPosition={setPosition}
					image={image}
					setImage={setImage} 
					savePriest={savePriest}
				/>
			</div>
		</div>
	)
}

export default Priests;