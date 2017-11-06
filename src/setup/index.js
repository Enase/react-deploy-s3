import inquirer from 'inquirer'
import AWS from 'aws-sdk'
import createBucket from './createBucket'
import configBucket from './configBucket'
import createCloudFrontDistribution from './createCloudFrontDistribution'
import clc from 'cli-color'

const setup = async function() {
  const credentials = await inquirer.prompt([
    {type: 'input', name: 'accessKeyId', message: 'AWS Access Key Id'},
    {type: 'password', name: 'secretAccessKey', message: 'AWS Secret Access Key'},
    {type: 'input', name: 'region', message: 'AWS Region'}
  ])

  AWS.config.update(credentials)

  const {bucketName} = await inquirer.prompt([
    {type: 'input', name: 'bucketName', message: 'Name of the bucket'}
  ])

  const s3 = new AWS.S3()

  console.log('')

  await createBucket(s3, bucketName)
  await configBucket(s3, bucketName)

  console.log('')

  const {createCloudFront} = await inquirer.prompt([
    {type: 'confirm', name: 'createCloudFront', message: 'Create CloudFront distribution'}
  ])

  if (!createCloudFront) {
    console.log('\n' + clc.bold('Your bucket is configured now run react-deploy-s3 deploy') + '\n')
    console.log('react-deploy-s3 deploy \\')
    console.log(`  --access-key-id ${credentials.accessKeyId} \\`)
    console.log(`  --secret-access-key ${credentials.secretAccessKey} \\`)
    console.log(`  --bucket ${bucketName} \\`)
    console.log(`  --region ${credentials.region}`)
    return
  }

  const cloudfront = new AWS.CloudFront()

  const distributionId = await createCloudFrontDistribution(cloudfront, bucketName)
  console.log('\n' + clc.bold('Your bucket and your CloudFront distribution are configured.'))

  console.log('')
  console.log('react-deploy-s3 deploy \\')
  console.log(`  --access-key-id ${credentials.accessKeyId} \\`)
  console.log(`  --secret-access-key ${credentials.secretAccessKey} \\`)
  console.log(`  --bucket ${bucketName} \\`)
  console.log(`  --region ${credentials.region} \\`)
  console.log(`  --distribution-id ${distributionId}`)
}

export default async function() {
  try {
    console.log('\n' + clc.blue.underline('React deploy S3: Setup') + '\n')
    await setup()
  } catch (error) {
    console.log('\n' + clc.bold.red(error.message) + '\n')
    process.exit(1)
  }
}
