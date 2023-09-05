import seeder from './270820230928PM'

seeder().then(() => {
    console.log('Seeding successful')
}, (error) => {
    console.error(error)
})
