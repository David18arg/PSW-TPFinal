<?php

namespace EmpresaBundle\Controller;

use EmpresaBundle\Entity\Vehiculo;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
/*AGREGADOs*/
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
/*AGREGADOs*/
/**
 * Vehiculo controller.
 *
 * @Route("vehiculo")
 */
class VehiculoController extends Controller
{
    /**
     * Lists all vehiculo entities.
     *
     * @Route("/", name="vehiculo_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $vehiculos = $em->getRepository('EmpresaBundle:Vehiculo')->findAll();
        $response = new Response();
        $encoders = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $response->setContent(json_encode(array(
        'vehiculos' => $serializer->serialize($vehiculos, 'json'),
        )));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Creates a new vehiculo entity.
     *
     * @Route("/new", name="vehiculo_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {   
        $vehiculo = new Vehiculo();
        $vehiculo->setPatente($request->request->get('patente'));
        $vehiculo->setMarca($request->request->get('marca'));
        $vehiculo->setModelo($request->request->get('modelo'));
        $imageArray = $request->files->get('imagen');
        
        /**
        * @var UploadedFile $image
        */
            $image = $imageArray;
        
            $imageName = md5(uniqid()).'.'.$image->guessExtension();
            $image->move($this->getParameter('image_directory'), $imageName);
            
            $vehiculo->setPathimagen($imageName);
        $vehiculo->setDisponible($request->request->get('disponible'));
        //guardamos en la bd
        $em = $this->getDoctrine()->getManager();
        $em->persist($vehiculo);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * Finds and displays a vehiculo entity.
     *
     * @Route("/{id}", name="vehiculo_show")
     * @Method("GET")
     */
    public function showAction(Vehiculo $vehiculo)
    {
        $deleteForm = $this->createDeleteForm($vehiculo);

        return $this->render('vehiculo/show.html.twig', array(
            'vehiculo' => $vehiculo,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing vehiculo entity.
     *
     * @Route("/{id}/edit", name="vehiculo_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction($id, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);
        
        $em = $this->getDoctrine()->getManager();
        $vehiculo = $em->getRepository('EmpresaBundle:Vehiculo')->find($id);
        
        $vehiculo->setPatente($request->request->get('patente'));
        $vehiculo->setMarca($request->request->get('marca'));
        $vehiculo->setModelo($request->request->get('modelo'));
        $vehiculo->setPathimagen($request->request->get('pathimagen'));
        $vehiculo->setDisponible($request->request->get('disponible'));
        //guardamos en la bd
        $em = $this->getDoctrine()->getManager();
        $em->persist($vehiculo);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * Deletes a vehiculo entity.
     *
     * @Route("/delete/{id}", name="vehiculo_delete")
     * @Method("DELETE")
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $vehiculo = $em->getRepository('EmpresaBundle:Vehiculo')->find($id);
        if (!$vehiculo){
            throw $this->createNotFoundException('id incorrecta');
        }
        $em->remove($vehiculo);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * Creates a form to delete a vehiculo entity.
     *
     * @param Vehiculo $vehiculo The vehiculo entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Vehiculo $vehiculo)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('vehiculo_delete', array('id' => $vehiculo->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
