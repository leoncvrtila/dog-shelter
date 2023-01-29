# Dog Shelter

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

## Run the build command
Run:
```
docker-compose build
```
This will build the container from the latest node alpine container image and set up the docker environment.

## Run the container
Once the build has finished, run
```
docker-compose up -d.
```
This runs the container in detached mode.

Enter the container via the shell entry
Now to get into the container via the shell:
```
docker exec -ti <name_of_your_container> sh
```
```
Replace <name_of_your_container> with the name of your running container. If you don't know the name of your container, run
```
```
docker-compose ps
```
## Run the Quasar dev server
NOTE: if you didn't have a Quasar project already started, skip to the Initializing a new project step.

If you added the files to your project, once you've ran the exec command, you should be in /home/node/app

Now enter
```
quasar dev
```
